import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { fetchBorrowedBook } from "../../../lib/action";


export default async function MyBooks() {
  let booksList;
  try {
    booksList = await fetchBorrowedBook();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }

  if (!booksList || booksList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          You haven&apos;t borrowed any books yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksList.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                    {book.borrowDate}
                </TableCell>
                <TableCell>
                    {book.dueDate}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="destructive" size="sm">
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
