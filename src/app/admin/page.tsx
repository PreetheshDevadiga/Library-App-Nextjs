import React from "react"
import { AddBook } from "@/components/home/addbook"
import { fetchBooks } from "@/lib/action"
import PaginationControls from "@/components/home/pagination"
import BooksTable from "@/components/admin/books/bookstable"
import { IBook } from "@/models/book.model"

interface BookTableProps {
  searchParams?: {
    query?: string
    page?: string
    sortBy?: string
    orderBy?: string
  }
}

export default async function BookTable({ searchParams }: BookTableProps) {
  const query: string = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = 6
  const offset = (Number(currentPage) - 1) * limit
  const sortBy = searchParams?.sortBy || "title"
  const orderBy = searchParams?.orderBy || "asc"

  const booksResponse = await fetchBooks(query, limit, offset, sortBy, orderBy)
  const booksList = booksResponse?.items || []
  const totalBooksList = Number(booksResponse?.pagination.total)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#091E3A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#80E9FF] to-[#635BFF]">
            Book Management
          </h1>
          <AddBook />
        </div>
        <div className="bg-[#0F2D52] rounded-xl overflow-hidden shadow-lg p-6">
          <BooksTable booksList={booksList} totalBooks={totalBooksList} query={query} />
          {totalBooksList > 0 && (
            <div className="mt-6">
              <PaginationControls totalBooks={totalBooksList} limit={limit} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}