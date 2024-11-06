import { z } from "zod";
import crypt from "node:crypto";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { sessions, users } from "~/server/db/schema";
import { env } from "~/env";
import { NextRequest, NextResponse } from "next/server";
import { v7 as uuid } from "uuid";
const loginData = z.object({
    username: z.string(),
    password: z.string(),
});

export const POST = async (req: NextRequest) => {
    const json = await req.json();
    const login = loginData.safeParse(json);


    if (!login.success) {
        return new NextResponse(JSON.stringify(login.error.flatten()), { status: 400 });
    }

    const user = await db.query.users.findFirst({
        where: eq(users.username, login.data.username),
    });

    if (!user) {
        return new NextResponse("invalid username or password", { status: 404 });
    }

    const hash = crypt.scryptSync(login.data.password, env.HASH_KEY, 64).toString("hex");
    if (hash !== user.password) {
        return new NextResponse("invalid username or password", { status: 404 });
    }

    const session = await db.insert(sessions).values({
        userId: user.id,
        token: uuid(),
        expiry: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    }).returning();

    if (!session[0]) {
        return new NextResponse("failed to create session", { status: 500 });
    }
    return new NextResponse(JSON.stringify({ status: "ok" }), { status: 200, headers: {"Set-Cookie": `session=${session[0].token}; Path=/; HttpOnly; SameSite=Strict; Expires=${session[0].expiry}`}});

}