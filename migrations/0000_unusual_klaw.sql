CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"author" varchar(150) NOT NULL,
	"publisher" varchar(100) NOT NULL,
	"genre" varchar(31) NOT NULL,
	"isbnNo" varchar(13) NOT NULL,
	"pages" integer NOT NULL,
	"totalCopies" integer NOT NULL,
	"availableCopies" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"phone" bigint,
	"address" varchar(100) NOT NULL,
	"role" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"refreshToken" varchar(100),
	CONSTRAINT "members_phone_unique" UNIQUE("phone"),
	CONSTRAINT "members_email_unique" UNIQUE("email"),
	CONSTRAINT "members_refreshToken_unique" UNIQUE("refreshToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookId" integer NOT NULL,
	"memberId" integer NOT NULL,
	"borrowDate" varchar(10),
	"dueDate" varchar(15),
	"status" varchar(15) NOT NULL,
	"returnDate" varchar(10)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
