import React from "react";
import { AddBook } from "@/components/home/addbook";
import { fetchBooks } from "@/lib/action";
import PaginationControls from "@/components/home/pagination";
import BooksTable from "@/components/admin/books/bookstable";
import { IBook } from "@/models/book.model";

interface Props {
  books: IBook[];
  totalBooks: number;
  query: string;
  currentPage: number;
  sortBy: string;
  orderBy: string;
}

export async function getServerSideProps({
  query,
}: {
  query: {
    query?: string;
    page?: string;
    sortBy?: string;
    orderBy?: string;
  };
}) {
  const searchQuery = query.query || "";
  const currentPage = Number(query.page) || 1;
  const limit = 6;
  const offset = (currentPage - 1) * limit;
  const sortBy = query.sortBy || "title";
  const orderBy = query.orderBy || "asc";

  const booksResponse = await fetchBooks(searchQuery, limit, offset, sortBy, orderBy);
  const books = booksResponse?.items || [];
  const totalBooks = Number(booksResponse?.pagination.total) || 0;

  return {
    props: {
      books,
      totalBooks,
      query: searchQuery,
      currentPage,
      sortBy,
      orderBy,
    },
  };
}

function BookTable({
  books,
  totalBooks,
  query,
  currentPage,
  sortBy,
  orderBy,
}: Props) {
  const limit = 6;

  return (
    <div className="container mx-auto">
      <div className="flex justify-end items-center mb-4">
        <AddBook />
      </div>
      <BooksTable booksList={books} totalBooks={totalBooks} query={query} />
      {totalBooks > 0 && (
        <div className="mt-4">
          <PaginationControls totalBooks={totalBooks} limit={limit} />
        </div>
      )}
    </div>
  );
}

export default BookTable;
