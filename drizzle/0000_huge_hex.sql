CREATE TABLE IF NOT EXISTS "DJ-grunk_albums" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"artist_id" integer NOT NULL,
	"cover" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DJ-grunk_artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "DJ-grunk_artists_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DJ-grunk_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer NOT NULL,
	"score" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DJ-grunk_reviews" ADD CONSTRAINT "DJ-grunk_reviews_album_id_DJ-grunk_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."DJ-grunk_albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
