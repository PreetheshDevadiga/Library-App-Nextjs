import { z } from "zod";

export const professorBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" }),
  shortBio: z
    .string()
    .trim()
    .min(10, { message: "Short bio must be at least 10 characters long" })
    .max(200, { message: "Short bio must be no longer than 200 characters" }),
  department: z
    .string()
    .trim()
    .min(2, { message: "Department name must be at least 2 characters long" }),
  calendlylink: z
    .string()
    .url({ message: "Calendly link must be a valid URL" }).nullable().optional(),

    email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(255, { message: "Email must be no longer than 255 characters" }),
    status:z.string().nullable().optional(),
});

// Complete schema with an ID and additional properties
export const professorSchema = professorBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
    
});

export type IProfessorBase = z.infer<typeof professorBaseSchema>;
export type IProfessor = z.infer<typeof professorSchema>;

export const professorBaseSchemaArray = z.array(professorBaseSchema);
export const professorSchemaArray = z.array(professorSchema);
