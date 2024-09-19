"use server";

import { IMember, IMemberBase, memberBaseSchema } from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { auth, signIn } from "../auth";
import { db } from "./db";
import { bookBaseSchema, IBookBase, newBookBaseSchema } from "@/models/book.model";
import { BooksTable, MemberTable, TransactionTable } from "@/drizzle/schema";
import { eq, and, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cloudinary } from "./cloudinary";


// cloudinary.config({
//   cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key:process.env.CLOUDINARY_API_KEY,
//   api_secret:process.env.CLOUDINARY_API_SECRET,
// })

const memberRepo = new MemberRepository(db);

const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);

export interface State {
  errors?: { [key: string]: string[] };
  message?: string;
}

export async function uploadImage(file: File) {
  if (!file) return { imageURL: "" };

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "BookCoverPages" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const reader = file.stream().getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          uploadStream.end();
        } else {
          uploadStream.write(value);
          pump();
        }
      };
      pump();
    });

    if (result && typeof result === "object" && "secure_url" in result) {
      console.log(result.secure_url);
      return { imageURL: result.secure_url as string };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image. Please try again." };
  }

  return { imageURL: "" };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("Success");
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password")
    });
    if(result){
      redirect("/home")
    }
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
console.log(data);
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

    if(password!==data.confirmPassword){
      return { message: "Passwords do not match" };
    }
    const createdUser = await memberRepo.create(newUser);

    console.log(`User ${createdUser.email} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:" };
  }
}

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number,
  sortBy?:string,
  orderBy?:string,
) { 
  try {
    
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
      sortBy:sortBy,
      orderBy:orderBy,
    });
    if (books) {
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

  const validateFields = newBookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbnNo"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
    price: Number(formData.get("price"))
  });

  const imageUrl = formData.get("imageURL") as string
  console.log("URL:",imageUrl)

  if (!validateFields.success) {
    console.log("Validation Failure");
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to register book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies,price} =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !genre ||
    !isbnNo ||
    !pages ||
    !totalCopies || !price
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
      price,
      imageUrl
    };

    const createdBook = await bookRepo.create(newBook);

    console.log(`Book ${createdBook.title} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book registration:", error);
    return { message: "Error during book registration."};
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
    price:Number(formData.get("price"))
  });

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;
    console.log("Validation Failure:", fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies,price} =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !genre ||
    !isbnNo ||
    !pages ||
    !totalCopies  === undefined
  ) {
    console.log("All fields are required");
    return { message: "All fields are required" };
  }

  const newImageUrl = formData.get("imageURL") as string

  try {
    await bookRepo.update(id, {
      title,
      author,
      publisher,
      genre,
      isbnNo,
      pages,
      totalCopies,
      price,
      imageUrl:newImageUrl,
    });

    console.log(`Book ${title} updated successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book update:", error);
    return { message: "Error during book update." };
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

export async function getUserByEmail(email: string) {
  try {
    return await memberRepo.getByEmail(email);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function createUser(memberData: IMemberBase) {
  try {
    const createdUser = await memberRepo.create(memberData);
    return createdUser;
  } catch (error) {
    console.error("Failed to create user for google login", error);
  }
}

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
      return { message: "Member already exists. Try SignIn" };
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newMember: IMemberBase = {
      firstName,
      lastName,
      phone,
      address,
      role,
      email,
      password: hashedPwd,
    };

    const createdMember = await memberRepo.create(newMember);

    console.log(
      `Member ${createdMember.firstName} ${createdMember.lastName} created successfully!`
    );
    return { message: "Success" };
  } catch (error:any) {
    if (error.message.includes("Duplicate entry") && error.message.includes("phone")) {
      return { message: "A member with this phone number already exists." };
    } else if(error.message.includes("Duplicate entry") && error.message.includes("email")) {
      return { message: "A member with this email address already exists." };
    }

    return { message: "Error during member registration.", error: error.message };
  }
}

// Transaction Operations
export async function fetchTransaction(
  search: string,
  limit: number,
  offset: number,
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
    const transactions = await transactionRepo.list(data,filterOption);

    if (transactions) {
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
    const userDetails:IMember|null = await memberRepo.getByEmail(email as string);
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
        bookId: BooksTable.id,
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
) {
  const params = {
    search: search,
    limit: limit,
    offset: offset,
  };
  try {
    const transactions = await db
    .select({
      id: TransactionTable.id,
      title: BooksTable.title,
      firstName: MemberTable.firstName,
      borrowDate: TransactionTable.borrowDate,
      dueDate:TransactionTable.dueDate,
      status:TransactionTable.status,
      returnDate:TransactionTable.returnDate
    })
    .from(TransactionTable)
    .leftJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
    .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id));

      if(transactions){
        console.log("transaction",transactions);
        return transactions;
      }else{
        console.error("error");
      }
  } catch (err) {
    console.log("error");
  }
}

export async function returnBook(bookId: number) {
  const today = new Date();
  const returnDate = today.toISOString().slice(0, 10);
  try {
    const currentMember = await fetchUserDetails();
    if (!currentMember) {
      throw new Error("User details not found");
    }

    const transactionId = await db
      .select({ id: TransactionTable.id })
      .from(TransactionTable)
      .where(
        and(
          eq(TransactionTable.bookId, bookId),
          eq(TransactionTable.memberId, currentMember.userDetails.id)
        )
      )
      .execute();

    if (transactionId.length === 0) {
      throw new Error("Transaction not found");
    }

    const transaction = await transactionRepo.update(
      transactionId[0].id,
      returnDate
    );

    if (transaction) {
      return transaction;
    } else {
      console.log("transaction not received");
    }
  } catch (error) {
    console.error("Failed to get the book details");
  }
}
