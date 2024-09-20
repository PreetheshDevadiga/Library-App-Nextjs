import { z } from "zod";

// export interface IBookBase {
//   title: string;
//   author: string;
//   publisher: string;
//   genre: string;
//   isbnNo: string;
//   numOfPages: number;
//   totalNumOfCopies: number;
// }

// export interface IBook extends IBookBase {
//   id: number;
//   availableNumOfCopies: number;
// }

export const bookBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long" })
    .regex(/^[\w\s\/\-.&,]+$/, {
      message: "Title must contain only alphanumeric characters, spaces, and the symbols: / - . , &",
    }),
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name must be at least 2 characters long" })
    .regex(/^[\w\s\/\-.&,]+$/, {
      message: "Author name must contain only alphabetic characters, spaces, and the symbols: / - . &",
    }),
  publisher: z
    .string()
    .trim()
    .min(2, { message: "Publisher name must be at least 2 characters long" })
    .regex(/^[\w\s\/\-.&,]+$/, {
      message: "Publisher name must contain only alphabetic characters, spaces, and the symbols: / - . &",
    }),
  genre: z
    .string()
    .trim()
    .min(2, { message: "Genre must be at least 2 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Genre must contain only alphabetic characters and spaces",
    }),
  isbnNo: z
    .string()
    .length(13, { message: "ISBN Number must be exactly 13 characters long" })
    .regex(/^\d+$/, { message: "ISBN Number must contain only digits" }),
  pages: z
    .number()
    .int({ message: "Number of pages must be an integer" })
    .positive({ message: "Number of pages must be a positive integer" })
    .min(1, { message: "Number of pages must be at least 1" }),
  totalCopies: z
    .number()
    .int({ message: "Total number of copies must be an integer" })
    .min(1, { message: "Total number of copies must be at least 1" })
    .positive({ message: "Total number of copies must be a positive integer" }),
  price: z
    .number()
    .nullable(),
    
  imageUrl: z
    .string()
    .url({ message: "Image URL must be a valid URL" })
    .nullable()
});

// New book schema without imageUrl
export const newBookBaseSchema = bookBaseSchema.omit({
  imageUrl: true,
});

// Complete book schema, adding ID and availableCopies
export const bookSchema = bookBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  availableCopies: z
    .number()
    .int({ message: "Available number of copies must be an integer" })
    .nonnegative({
      message: "Available number of copies must be a non-negative integer",
    }),
});

export type IBookBase = z.infer<typeof bookBaseSchema>;
export type IBook = z.infer<typeof bookSchema>;

export const bookBaseSchemaArray = z.array(bookBaseSchema);
export const bookSchemaArray = z.array(bookSchema);
