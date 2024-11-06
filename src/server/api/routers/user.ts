import { sessions, users } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { env } from "~/env";
import crypt from "node:crypto";
import { v7 as uuid } from "uuid";

export const UserRouter = createTRPCRouter({
    getUser: protectedProcedure.query(async ({ctx}) => {
        const user = await ctx.db.query.users.findFirst({
            where: eq(users.id, ctx.user.id),
            with: {
                sessions: true,
                owned_albums: true,
            }
        })

        if(!user) {
            throw new Error('User not found');
        }

        return user;
    }),
})