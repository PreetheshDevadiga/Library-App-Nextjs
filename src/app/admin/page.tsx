import React from 'react';
import { AddBook } from "../../components/home/addbook"
import { fetchBooks } from "../../lib/action"
import PaginationControls from '../../components/home/pagination';
import BooksTable from "../../components/admin/books/bookstable"

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
      <div className="flex justify-end items-center mb-4">
        <AddBook />
      </div>
      <BooksTable booksList={booksList} totalBooks={totalBooks} query={query} />
      {totalBooks > 0 && (
        <div className="mt-4">
          <PaginationControls totalBooks={totalBooks} limit={limit} />
        </div>
      )}
    </div>
  );
}

export default BookTable;
