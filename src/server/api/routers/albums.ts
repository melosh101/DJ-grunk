import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const albumCovers = createTRPCRouter({
    getAlbum: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        return {
            id: input.id,
            cover: "https://via.placeholder.com/150",
            title: "Album title",
            artist: "Artist name",
        };
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