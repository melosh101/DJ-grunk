// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import exp from "constants";
import { relations} from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  text,
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

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  grunker: integer("grunker").notNull().default(1500),
})

export const sessions = createTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull(),
  expiry: text("expiry").notNull(),
})

export const artistRelations = relations(artists, ({many}) => ({
  albums: many(albums),
}))

export const albumRelations = relations(albums, ({one, many}) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  reviews: many(reviews),
}))

export const userRelations = relations(users, ({many}) => ({
  sessions: many(sessions),
  owned_albums: many(albums),
}))

export const sessionRelations = relations(sessions, ({one}) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))


export type album = typeof albums.$inferSelect;
export type albumWithArtist = album & { artist: typeof artists.$inferSelect };
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type SessionWithUser = Session & { user: User };

