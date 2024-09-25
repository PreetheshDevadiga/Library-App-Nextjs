CREATE TABLE IF NOT EXISTS "professors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"shortBio" text NOT NULL,
	"department" varchar(255) NOT NULL,
	"calendlyLink" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "price" SET DATA TYPE integer;