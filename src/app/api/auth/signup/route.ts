import { z } from "zod";
import crypt from "node:crypto";
import { db } from "~/server/db";
import { sessions, users } from "~/server/db/schema";
import { env } from "~/env";
import { v7 as uuid } from "uuid"
import { NextRequest, NextResponse } from "next/server";

const signup = z.object({
    username: z.string(),
    password: z.string(),
});

export const POST = async (req: NextRequest) => {
    const data = signup.safeParse(await req.json());

    if (!data.success) {
        return new NextResponse(JSON.stringify(data.error.flatten()), {status: 400});
    }
    const passwordHash = crypt.scryptSync(data.data.password, env.HASH_KEY, 64).toString("hex");

    const user = await db.insert(users).values({
        username: data.data.username,
        password: passwordHash,
    }).returning();

    if(!user[0]) {
        return new NextResponse("user already exits", {status: 400});
    }

    const token = uuid();

    const session = await db.insert(sessions).values({
        userId: user[0].id,
        token,
        expiry: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    }).returning();

    if(!session[0]) {
        return new NextResponse("failed to create session", {status: 500});
    }

    return new NextResponse(JSON.stringify({status: "ok"}), {headers: {"Set-Cookie": `session=${session[0].token}; Path=/; HttpOnly; SameSite=Strict; Expires=${session[0].expiry}`}, status: 200});
}