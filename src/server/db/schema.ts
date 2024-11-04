// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `DJ-grunk_${name}`);

export const artists = createTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
})

export const reviews = createTable("reviews", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull().references(() => albums.id),
  score: integer("score").notNull(),
  content: text("content").notNull(),
})

export const albums = createTable("albums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artistId: integer("artist_id").notNull(),
  cover: text("cover").notNull(),
})

export const artistRelations = relations(artists, ({one, many}) => ({
  albums: many(albums),
}))

export const albumRelations = relations(albums, ({one, many}) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  reviews: many(reviews),
}))


