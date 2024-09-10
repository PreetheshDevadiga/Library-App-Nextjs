import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { AddBook } from "../../components/home/addbook"
import { EditBook } from "../../components/admin/books/editBook"
import { fetchBooks } from "../../lib/action.ts"
import { SearchBar } from "../../components/home/search"
import PaginationControls from '../../components/home/pagination';
import { DeleteBook } from '../../components/admin/books/deleteBook.tsx';

async function BookTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;

  const booksResponse = await fetchBooks(query, limit, offset);
  const booksList = booksResponse?.items || [];
  const totalBooks = Number(booksResponse?.pagination.total);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <SearchBar />
        <AddBook />
      </div>
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Total Copies</TableHead>
              <TableHead>Available Copies</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalBooks > 0 ? (
              booksList.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.isbnNo}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell>{book.availableCopies}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <EditBook id={book.id} />
                        <DeleteBook bookId={book.id} bookTitle={book.title}/>
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-black">
                  No books found for `{query}`
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalBooks > 0 && (
        <div className="mt-4">
          <PaginationControls totalBooks={totalBooks} limit={limit} />
        </div>
      )}
    </div>
  );
}

export default BookTable;
