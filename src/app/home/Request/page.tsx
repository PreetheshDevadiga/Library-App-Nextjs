import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { fetchRequestDetails } from "../../../lib/action";

export default async function Requests() {
  let booksList;
  try {
    booksList = await fetchRequestDetails();
  } catch (error) {
    console.error("Failed to fetch request details:", error);
    throw error;
  }

  if (!booksList || booksList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          No requests found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksList.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="w-[300px]">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
