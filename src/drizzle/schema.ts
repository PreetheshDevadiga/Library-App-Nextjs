import { drizzle } from 'drizzle-orm/vercel-postgres';
import {
  bigint,
  integer,
  serial,
  varchar,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

// Books Table
export const BooksTable = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publisher: varchar("publisher", { length: 100 }).notNull(),
  genre: varchar("genre", { length: 31 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 13 }).notNull(),
  pages: integer("pages").notNull(),
  totalCopies: integer("totalCopies").notNull(),
  availableCopies: integer("availableCopies").notNull(),
  price: integer("price"),
  imageUrl: varchar("imageUrl", { length: 255 })
});

// Members Table
export const MemberTable = pgTable("members", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phone: bigint("phone", { mode: "number" }).unique(),
  address: varchar("address", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  refreshToken: varchar("refreshToken", { length: 100 }).unique(),
});

// Transactions Table
export const TransactionTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookId: integer("bookId")
    .notNull()
    .references(() => BooksTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  memberId: integer("memberId")
    .notNull()
    .references(() => MemberTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  borrowDate: varchar("borrowDate", { length: 10 }),
  dueDate: varchar("dueDate", { length: 15 }),
  status: varchar("status", { length: 15 }).notNull(),
  returnDate: varchar("returnDate", { length: 10 }),
});

export const ProfessorTable = pgTable("professors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }) 
    .notNull(),

  shortBio: text("shortBio")
    .notNull(),
    
  department: varchar("department", { length: 255 })
    .notNull(),

    calendlylink: varchar("calendlylink", { length: 255 }),
    
    email:varchar("email",{length:255}),

    status:varchar("status",{length:255})
  
});