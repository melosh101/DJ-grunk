import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { albums } from "~/server/db/schema";

export const albumCovers = createTRPCRouter({
    getAlbum: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
        const album = ctx.db.query.albums.findFirst({
            where: eq(albums.id, input.id),
            with: {
                artist: true,
            }
        })

        if(!album) {
            throw new Error('Album not found');
        }

        return album;
    }),

    getAllAlbums: publicProcedure.query(async ({ctx}) => {
        const albums = ctx.db.query.albums.findMany({
            with: {
                artist: true,
            }
        })
        return albums;
    }),
})