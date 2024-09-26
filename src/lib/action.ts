import { useTransition } from "react";
'use server'

import {
  IMember,
  IMemberBase,
  memberBaseSchema,
  editMemberSchema,
} from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { auth, signIn } from "../auth";
import { db } from "./db";
import {
  bookBaseSchema,
  IBookBase,
  newBookBaseSchema,
} from "@/models/book.model";
import {
  BooksTable,
  MemberTable,
  ProfessorTable,
  TransactionTable,
} from "@/drizzle/schema";
import { eq, and, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cloudinary } from "./cloudinary";

const memberRepo = new MemberRepository(db);

const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);

const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN;

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
      password: formData.get("password"),
    });
    const email = formData.get("email");
    const userDetails = await memberRepo.getByEmail(email as string);
    const userRole = userDetails?.role;
    console.log(userRole);
    if (userRole === "admin") {
      redirect("/admin");
    }
    redirect("/home");
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
      message: "Missing Fields. Failed to Create Account.",
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

    if (password !== data.confirmPassword) {
      console.log("im here");
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
  sortBy?: string,
  orderBy?: string
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
      sortBy: sortBy,
      orderBy: orderBy,
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
    price: Number(formData.get("price")),
  });

  const imageUrl = formData.get("imageURL") as string;
  console.log("URL:", imageUrl);

  if (!validateFields.success) {
    console.log("Validation Failure");
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to register book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies, price } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !genre ||
    !isbnNo ||
    !pages ||
    !totalCopies ||
    !price
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
      imageUrl,
    };

    const createdBook = await bookRepo.create(newBook);

    console.log(`Book ${createdBook.title} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during book registration:", error);
    return { message: "Error during book registration." };
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
  const validateFields = newBookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbnNo"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
    price: Number(formData.get("price")),
  });

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;
    console.log("Validation Failure:", fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update book.",
    };
  }

  const { title, author, publisher, genre, isbnNo, pages, totalCopies, price } =
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

  const imageUrl = formData.get("imageURL") as string;

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
      imageUrl,
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
    console.log("Error during book deletion:", error);
    return { message: "Error during book deletion.", error };
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
  } catch (error: any) {
    if (
      error.message.includes("Duplicate entry") &&
      error.message.includes("phone")
    ) {
      return { message: "A member with this phone number already exists." };
    } else if (
      error.message.includes("Duplicate entry") &&
      error.message.includes("email")
    ) {
      return { message: "A member with this email address already exists." };
    }

    return {
      message: "Error during member registration.",
      error: error.message,
    };
  }
}

export async function deleteMember(id: number) {
  try {
    console.log(id);
    const result = await memberRepo.delete(id);

    console.log(`Member ${result?.firstName} deleted successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during Member Deletion:", error);
    return { message: "Error during Member Deletion.", error };
  }
}

export async function updateMemberRole(id: number, role: string) {
  console.log(id, role);
  try {
    await memberRepo.update(id, { role: role });
    console.log("success");
  } catch (error) {
    console.log("Error during Member Update:", error);
    return { message: "Error during Member Update." };
  }
}

export async function editMember(prevState: State, formData: FormData) {
  const userData = await fetchUserDetails();
  const role: string | undefined = userData?.userDetails.role;
  const validateFields = editMemberSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    role: role,
  });

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update details.",
    };
  }

  const { firstName, lastName, phone, address, email } = validateFields.data;

  if (!firstName || !lastName || !phone || !address || !email) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    const editedMember = await memberRepo.update(
      existingUser!.id,
      validateFields.data
    );
    console.log(`Member ${editedMember!.firstName} edited successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during editing profile:", error);
    return { message: "Error during editing profile:", error };
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
  filterOption: string | undefined,
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
    const transactions = await transactionRepo.list(data, filterOption);

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
    const userDetails: IMember | null = await memberRepo.getByEmail(
      email as string
    );
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
        imageUrl: BooksTable.imageUrl,
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
        dueDate: TransactionTable.dueDate,
        status: TransactionTable.status,
        returnDate: TransactionTable.returnDate,
      })
      .from(TransactionTable)
      .leftJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
      .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id));

    if (transactions) {
      console.log("transaction", transactions);
      return transactions;
    } else {
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
    if (currentMember.userDetails.role === "user") {
      throw new Error("Only admins can return books");
    }
    const transactionId = await db
      .select({ id: TransactionTable.id })
      .from(TransactionTable)
      .where(eq(TransactionTable.bookId, bookId))
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

export async function fetchProfessor() {
  try {
    const professors = await db.select().from(ProfessorTable);
    return professors;
  } catch (e) {
    console.error("Failed to get the professors details", e);
  }
}

export async function fetchProfessorById(id: number) {
  try {
    const [professor] = await db
      .select()
      .from(ProfessorTable)
      .where(eq(ProfessorTable.id, id));

    return professor;
  } catch (e) {
    console.error("Failed to get the professors details", e);
  }
}

// export async function getUserUri() {
//   try {
//     const response = await fetch("https://api.calendly.com/users/me", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Prganizations", response);
//     if (!response.ok) {
//       throw new Error(`Error fetching user info: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("scheduled event==>", data.resource.name);
//     return data.resource.uri; // This is the user's URI
//   } catch (error) {
//     console.error("Error fetching user URI", error);
//     throw error;
//   }
// }

// // Fetch scheduled events for the user
// export async function getScheduledEvents() {
//   const userUri = await getUserUri(); // Get the logged-in user's URI

//   try {
//     const response = await fetch(
//       `https://api.calendly.com/scheduled_events?user=${encodeURIComponent(
//         userUri
//       )}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log("Error fetching scheduled events:", errorText);
//       throw new Error(`Error fetching Calendly events: ${response.statusText}`);
//     }

//     const data = await response.json();
//     // console.log("Scheduled events:", data);

//     return data.collection;
//     // Return an array of scheduled events
//   } catch (error) {
//     console.error("Error fetching scheduled events", error);
//     throw error;
//   }
// }

// export async function getEventUuid() {
//   const events = await getScheduledEvents();
//   console.log("Events in getEventuuid", events);

//   if (events.length > 0) {
//     const eventDetails = events.map((event: any) => {
//       const eventUuid = event.uri.split("/").pop(); // Extract the UUID from the URI
//       const startTime = event.start_time;
//       const endTime = event.end_time;
//       const gmeetLink = event.location.join_url; // Extract Google Meet link
//       const memberShip=event.event_memebrships[0];
//       const professorEmail=memberShip? memberShip.user_email : null;

//       const convertToIST = (utcTime: string) => {
//         const date = new Date(utcTime);
//         const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30 in milliseconds
//         const istDate = new Date(date.getTime() + istOffset);

//         return istDate.toISOString().replace("T", " ").slice(0, 19); // Format: YYYY-MM-DD HH:MM:SS
//       };

//       return {
//         uuid: eventUuid,
//         startTime: convertToIST(startTime),
//         endTime: convertToIST(endTime),
//         gmeetLink,
//         professorEmail
//       };
//     });

//     console.log("Event Details:", eventDetails);

//     return eventDetails;
//   } else {
//     console.log("No events found");
//     return null;
//   }
// }

// export async function getProfessorByEmail(email: string) {
//   try {
//     const [professors] = await db
//       .select()
//       .from(ProfessorTable)
//       .where(eq(ProfessorTable.email, email));
//     if (!professors) {
//       console.log("No professors");
//     }
//     return professors;
//   } catch (error) {
//     console.error("Failed to fetch professor by email", error);
//   }
// }

// export async function getInviteeDetails() {
//   const eventDetails = await getEventUuid();
// console.log("eventDetails",eventDetails)
//   // Use Promise.all to wait for all fetch calls to complete
//   const inviteeDetails = await Promise.all(
//     eventDetails.map(async (event: any) => {
//       const startTime = event.startTime;
//       const endTime = event.endTime;
//       const gmeetLink = event.gmeetLink;
//       const event_uuid = event.uuid;

//       const response = await fetch(
//         `https://api.calendly.com/scheduled_events/${event_uuid}/invitees`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Error fetching scheduled events:", errorText);
//         throw new Error(
//           `Error fetching Calendly events: ${response.statusText}`
//         );
//       }

//       const data = await response.json();
//       console.log("Scheduled event invitees:", data);

//       const convertToIST = (utcTime: string) => {
//         const date = new Date(utcTime);
//         const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30 in milliseconds
//         const istDate = new Date(date.getTime() + istOffset);

//         return istDate.toISOString().replace("T", " ").slice(0, 19); // Format: YYYY-MM-DD HH:MM:SS
//       };
//       // Map the invitees to the desired output format
//       const invitees = data.collection.map((invitee: any) => ({
//         startTime: convertToIST(startTime),
//         endTime: convertToIST(endTime),
//         gmeetLink,
//         name: invitee.name,
//         email: invitee.email,
//       }));

//       return invitees; // Return the array of invitee details for this event
//     })
//   );

//   // Flatten the array of arrays into a single array
//   return inviteeDetails.flat();
// }

// export async function getUerAppointmentList() {
//   try {
//     console.log("heee")
//     const userInformation = await fetchUserDetails();
//     const currentUserEmail = userInformation?.userDetails;
//     const userEmail = currentUserEmail?.email;
//     console.log("userEmail",userEmail)
//     const scheduleDetails = await getInviteeDetails();
//     console.log("scheduleDetails",scheduleDetails)
//     const userAppointments = scheduleDetails.filter(
//       (details) => details.email === userEmail
//     );
//     console.log("userAppointments",userAppointments)
//     const enrichedAppointments = await Promise.all(
//       userAppointments.map(async (appointment) => {
//         const profDetails = await getProfessorByEmail(
//           appointment.professorEmail
//         );

//         console.log(profDetails);
//         return {
//           ...appointment,
//           profresssorName: profDetails!.name,
//           professorDepartment: profDetails!.department,
//         };
//       })
//     );
//     return enrichedAppointments;
//   } catch (error) {
//     console.error("Failed to get appointements", error);
//   }
// }

export async function getUserUri() {
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Organizations", response);
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.resource.uri; // This is the user's URI
  } catch (error) {
    console.error("Error fetching user URI", error);
    throw error;
  }
}

// Fetch scheduled events for the user
export async function getScheduledEvents() {
  const userUri = await getUserUri(); // Get the logged-in user's URI

  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events?user=${encodeURIComponent(
        userUri
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Scheduled events:", data);
    // console.log("Members", data.collection);
    return data.collection; // Return an array of scheduled events
  } catch (error) {
    console.error("Error fetching scheduled events", error);
    throw error;
  }
}

export async function getEventUuid() {
  const events = await getScheduledEvents();
  console.log("Events in getEventuuid", events);

  if (events.length > 0) {
    const eventDetails = events.map((event: any) => {
      const eventUuid = event.uri.split("/").pop(); // Extract the UUID from the URI
      const startTime = event.start_time;
      const endTime = event.end_time;
      const gmeetLink = event.location.join_url; // Extract Google Meet link
      const status=event.status;
      const membership = event.event_memberships[0]; // Get the first membership
      const profEmail = membership ? membership.user_email : null;
      return {
        uuid: eventUuid,
        startTime,
        endTime,
        gmeetLink,
        profEmail,
        status,
      };
    });


    return eventDetails;
  } else {
    console.log("No events found");
    return null;
  }
}

export async function getInviteeDetails() {
  const eventDetails = await getEventUuid();

  // Use Promise.all to wait for all fetch calls to complete
  const inviteeDetails = await Promise.all(
    eventDetails.map(async (event: any) => {
      const startTime = event.startTime;
      const endTime = event.endTime;
      const gmeetLink = event.gmeetLink;
      const professorEmail = event.profEmail;
      const event_uuid = event.uuid;
      const status=event.status;

      const response = await fetch(
        `https://api.calendly.com/scheduled_events/${event_uuid}/invitees`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error fetching scheduled events:", errorText);
        throw new Error(
          `Error fetching Calendly events: ${response.statusText}`
        );
      }

      const data = await response.json();

      const convertToIST = (utcTime: string) => {
        const date = new Date(utcTime);

        // Options for time formatting in IST
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata", // IST timezone
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // 12-hour format
        };

        // Convert UTC time to IST using toLocaleString
        const istDateTime = date.toLocaleString("en-IN", options);

        return istDateTime; 
      };

      const invitees = data.collection.map((invitee: any) => ({
        startTime: convertToIST(startTime),
        endTime: convertToIST(endTime),
        gmeetLink,
        event_uuid,
        professorEmail,
        name: invitee.name,
        email: invitee.email,
        status,
        rescheduleUrl:invitee.reschedule_url,
      }));

      return invitees; // Return the array of invitee details for this event
    })
  );


  return inviteeDetails.flat();
}

export async function getProfessorByEmail(email: string) {
  try {
    const [professors] = await db
      .select()
      .from(ProfessorTable)
      .where(eq(ProfessorTable.email, email));
    if (!professors) {
      console.log("No professors");
    }
    return professors;
  } catch (error) {
    console.error("Failed to fetch professor by email", error);
  }
}

export async function getUserAppointments() {
  try {
    const userDetails = await fetchUserDetails();
    const userEmail = userDetails?.user?.email
      ? userDetails.user.email
      : userDetails!.userDetails.email;
    console.log("Email", userEmail);
    const scheduledDetails = await getInviteeDetails();
    console.log("scheduledDetails",scheduledDetails);
    const userAppointments = scheduledDetails.filter(
      (details) => details.email === userEmail
    );

    const enrichedAppointments = await Promise.all(
      userAppointments.map(async (appointment) => {
        const profDetails = await getProfessorByEmail(
          appointment.professorEmail
        );
        return {
          ...appointment,
          profname: profDetails!.name,
          profdept: profDetails!.department,
        };
      })
    );

    const activeAppointments =enrichedAppointments.filter((appointment)=>appointment.status==="active")
    return activeAppointments;
  } catch (error) {
    console.error("Failed to get appointments", error);
  }
}

export async function getAllAppointments() {
  try {
    const userDetails = await fetchUserDetails();
    const userEmail = userDetails?.userDetails.email;
    const scheduledDetails = await getInviteeDetails();
    const enrichedAppointments = await Promise.all(
      scheduledDetails.map(async (appointment) => {
        const profDetails = await getProfessorByEmail(
          appointment.professorEmail
        );
       
        return {
          ...appointment,
          profname: profDetails!.name,
          profdept: profDetails!.department,
        };
      })
    );

    return enrichedAppointments;
  } catch (error) {
    console.error("Failed to get appointments", error);
  }
}

export async function cancelAppointments(event_uuid: string) {
  try {
    console.log("heeyyyy")
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${event_uuid}/cancellation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "User canceled the event",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Canceled Data", data);
    return data;
  } catch (error) {
    console.error("Failed to cancel appointment");
  }
}