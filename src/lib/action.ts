"use server";

import { IMemberBase, memberBaseSchema } from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { auth, signIn } from "../auth";
import { db } from "./db";
import { bookBaseSchema, IBookBase } from "@/models/book.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BooksTable, MemberTable, TransactionTable } from "@/drizzle/schema";
import { eq, and, ne, ilike, like } from "drizzle-orm";
import { IPageRequest } from "@/repositories/pagination.response";
import { ITransaction } from "@/models/transaction.model";

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);

export interface State {
  errors?: { [key: string]: string[] };
  message?: string;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("Success");
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function registerUser(prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: "Mangalore",
    email: formData.get("email"),
    password: formData.get("password"),
    role: "user",
  });
  if (!validateFields.success) {
    console.log("Failure");
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { firstName, lastName, phone, address, email, password, role } =
    validateFields.data;

  if (!firstName || !lastName || !phone || !address || !email || !password) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return { message: "User already exists." };
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser: IMemberBase = {
      firstName,
      lastName,
      phone,
      address,
      role,
      email,
      password: hashedPwd,
    };

    const createdUser = await memberRepo.create(newUser);

    console.log(`User ${createdUser.email} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:", error };
  }
}

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
    });
    if (books) {
      console.log("Received books");
      return books;
    } else {
      console.log("Books not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}

export async function addNewBook(prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbnNo"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
  });

  if (!validateFields.success) {
    console.log("Validation Failure");
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to register book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !genre ||
    !isbnNo ||
    !pages ||
    !totalCopies
  ) {
    console.log("All fields are required");
    return { message: "All fields are required" };
  }

  try {
    const existingBook = await bookRepo.getByISBN(isbnNo);

    if (existingBook) {
      console.log("Book already exists.");
      return { message: "Book already exists." };
    }

    const newBook: IBookBase = {
      title,
      author,
      publisher,
      genre,
      isbnNo,
      pages,
      totalCopies,
    };

    const createdBook = await bookRepo.create(newBook);

    console.log(`Book ${createdBook.title} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book registration:", error);
    return { message: "Error during book registration.", error };
  }
}

export async function fetchBookById(id: number) {
  const existingBook = await bookRepo.getById(id);

  if (!existingBook) {
    console.log("book not found");
  }
  return existingBook;
}

export async function updateBook(
  id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbnNo"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
  });

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;
    console.log("Validation Failure:", fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !genre ||
    !isbnNo ||
    !pages ||
    !totalCopies === undefined
  ) {
    console.log("All fields are required");
    return { message: "All fields are required" };
  }

  try {
    await bookRepo.update(id, {
      title,
      author,
      publisher,
      genre,
      isbnNo,
      pages,
      totalCopies,
    });

    console.log(`Book ${title} updated successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book update:", error);
    return { message: "Error during book update.", error };
  }
}

export async function deleteBook(id: number) {
  try {
    console.log(id);
    const result = await bookRepo.delete(id);

    console.log(`Book ${result?.title} deleted successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book update:", error);
    return { message: "Error during book update.", error };
  }
}

// Member Operation

export async function fetchMember(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const members = await memberRepo.list({
      search: search,
      limit: limit,
      offset: offset,
    });
    if (members) {
      console.log("Received member");
      return members;
    } else {
      console.log("members not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}


export async function addNewMember(prevState: State, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
  
    const validateFields = memberBaseSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: Number(formData.get("phone")),
      address: formData.get("address"),
      role: formData.get("role"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  
    if (!validateFields.success) {
      console.log("Validation Failure");
      return {
        errors: validateFields.error.flatten().fieldErrors,
        message: "Missing or invalid fields. Failed to register member.",
      };
    }
  
    const { firstName, lastName, phone, address, role, email, password } =
      validateFields.data;
  
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !role ||
      !email ||
      !password
    ) {
      console.log("All fields are required");
      return { message: "All fields are required" };
    }
  
    try {
      const existingMember = await memberRepo.getByEmail(email);
  
      if (existingMember) {
        console.log("Member already exists.");
        return { message: "Member already exists." };
      }
  
      const newMember: IMemberBase = {
        firstName,
        lastName,
        phone,
        address,
        role,
        email,
        password,
      };
  
      const createdMember = await memberRepo.create(newMember);
  
      console.log(`Member ${createdMember.firstName} ${createdMember.lastName} created successfully!`);
      return { message: "Success" };
    } catch (error) {
      console.log("Error during member registration:", error);
      return { message: "Error during member registration.", error };
    }
  }


// Transaction Operations
export async function fetchTransaction(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const transactions = await transactionRepo.list({
      search: search,
      limit: limit,
      offset: offset,
    });

    if (transactions) {
      console.log("Received transaction");
      return transactions;
    } else {
      console.log("transaction not received");
    }
  } catch (error) {
    console.error("Error handling transaction request:", error);
  }
}

export async function fetchTransactionByStatus(
  filterOption: string,
  search: string,
  limit: number,
  offset: number
) {
  try {
    const data = {
      search: search,
      limit: limit,
      offset: offset,
    };
    const transactions = await transactionRepo.listByStatus(filterOption, data);

    if (transactions) {
      console.log("Received transaction");
      return transactions;
    } else {
      console.log("transaction not received");
    }
  } catch (error) {
    console.error("Error handling transaction request:", error);
  }
}

// export async function fetchTransaction(search: string, limit: number, offset: number) {
//   try {

//     const transactions = await db
//       .select({
//         id: TransactionTable.id,
//         title: BooksTable.title,
//         author: BooksTable.author,
//         memberFirstName: MemberTable.firstName,
//         memberLastName: MemberTable.lastName,
//         dueDate: TransactionTable.dueDate,
//         status: TransactionTable.status,
//       })
//       .from(TransactionTable)
//       .innerJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
//       .innerJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id))
//       .where(
//         and(
//           like(BooksTable.title, `%${search}%`),
//           ne(TransactionTable.status, "Returned")
//         )
//       )
//       .limit(limit)
//       .offset(offset);

//     if (transactions) {
//       console.log("Received transactions with member and book details");
//       return transactions;
//     } else {
//       console.log("Transactions not received");
//     }
//   } catch (error) {
//     console.error("Error handling transaction request:", error);
//   }
// }

export async function aproveTransaction(id: number) {
  try {
    await transactionRepo.issueBook(id);
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}

export async function rejectRequest(id: number) {
  try {
    await transactionRepo.rejectRequest(id);
  } catch (error) {
    console.error("Error handling book request:", error);
    throw error;
  }
}

export async function fetchUserDetails() {
  const session = await auth();
  const user = session?.user;
  const email = user?.email;
  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("Details could not be found");
    }
    return { userDetails, user };
  } catch (error) {
    console.error("Error finding details of user", error);
  }
}

export async function requestBook(memberId: number, bookId: number) {
  try {
    const data = { memberId: memberId, bookId: bookId };

    const borrowingBook = await transactionRepo.create(data);
    console.log(borrowingBook);
    return borrowingBook;
  } catch (error) {
    console.error("Error finding details of book", error);
  }
}

export async function fetchRequestDetails() {
  try {
    const currentMember = await fetchUserDetails();

    if (!currentMember) {
      throw new Error("User details not found");
    }

    const transactions = await db
      .select({
        id: TransactionTable.id,
        title: BooksTable.title,
        author: BooksTable.author,
        dueDate: TransactionTable.dueDate,
        status: TransactionTable.status,
      })
      .from(TransactionTable)
      .innerJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
      .where(
        and(
          eq(TransactionTable.memberId, currentMember.userDetails.id),
          ne(TransactionTable.status, "Returned")
        )
      );

    return transactions;
  } catch (error) {
    console.error("Failed to get the book details");
  }
}

export async function fetchBorrowedBook() {
  try {
    const currentMember = await fetchUserDetails();

    if (!currentMember) {
      throw new Error("User details not found");
    }

    const transactions = await db
      .select({
        id: TransactionTable.id,
        title: BooksTable.title,
        author: BooksTable.author,
        borrowDate: TransactionTable.borrowDate,
        dueDate: TransactionTable.dueDate,
        status: TransactionTable.status,
      })
      .from(TransactionTable)
      .innerJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
      .where(
        and(
          eq(TransactionTable.memberId, currentMember.userDetails.id),
          eq(TransactionTable.status, "Issued")
        )
      );

    return transactions;
  } catch (error) {
    console.error("Failed to get the book details");
  }
}


export async function fetchTransactionDetails(
  search: string,
  limit: number,
  offset: number
): Promise<
  { items: ITransaction[]; pagination: { offset: number; limit: number; total: number } } 
  | { message: string }
> {
  const params = {
    search: search,
    limit: limit,
    offset: offset,
  };

  try {
    const transactions = await transactionRepo.listTransactionDetails(params);

    if (transactions) {
      console.log("transaction", transactions);
      return transactions; 
    } else {
      console.log("transaction not received");
      return { message: "No transactions found" }; 
    }
  } catch (err) {
    return { message: (err as Error).message }; 
  }
}
