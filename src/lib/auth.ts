import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import React from "react";
import { db } from "~/server/db";
import { sessions, SessionWithUser } from "~/server/db/schema";

export const useServerAuth = async () => {
    const cookie = (await cookies()).get("session");
    if(!cookie) {
        return null;
    }
    const session = await db.query.sessions.findFirst({
        where: eq(sessions.token, cookie.value),
        with: {
            user: true,
        }
    });

    if(!session) {
        return null;
    }

    if(new Date(session.expiry) < new Date()) {
        await db.delete(sessions).where(eq(sessions.id, session.id));
        return null;
    }

    return session.user;
}

export const authCtx = React.createContext<SessionWithUser|null>(null);

export const useAuthContext = () => {
    return React.useContext(authCtx);
}