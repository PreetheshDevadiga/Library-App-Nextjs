"use client"

import React, { useEffect, useState } from "react";
import { AddBook } from "@/components/home/addbook";
import { fetchBooks } from "@/lib/action";
import PaginationControls from "@/components/home/pagination";
import BooksTable from "@/components/admin/books/bookstable";
import { IBook } from "@/models/book.model";

function BookTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortBy?: string;
    orderBy?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;
  const sortBy = searchParams?.sortBy || "title";
  const orderBy = searchParams?.orderBy || "asc";
const [books,setbooks] = useState<IBook[]>([]);
const [totalBooks,setTotalBooks]= useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await fetchBooks(
        query,
        limit,
        offset,
        sortBy,
        orderBy
      );
      let booksList = booksResponse?.items || [];
      let totalBooksList = Number(booksResponse?.pagination.total);

      setbooks(booksList);
      setTotalBooks(totalBooksList);
    };

    fetchData();
  },[offset, orderBy, query, searchParams, sortBy]);
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
