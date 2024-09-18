import React from 'react'
import BookCard from '@/components/home/book-card'
import { SearchBar } from "@/components/home/search"
import PaginationControls from '@/components/home/pagination'
import { fetchBooks, fetchUserDetails } from "@/lib/action"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import BorrowBook from '@/components/home/borrowBook'
import { Separator } from '@/components/ui/separator';
import { BookOpen, Building, BookCopy, Users } from 'lucide-react'
import Image from 'next/image'

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query: string = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = 8
  const offset = (Number(currentPage) - 1) * limit

  const booksResponse = await fetchBooks(query, limit, offset)
  const memberDetails = await fetchUserDetails()
  const memberId = memberDetails?.userDetails.id
  const booksList = booksResponse?.items
  const totalBooks = Number(booksResponse?.pagination.total)

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-6 flex flex-row justify-between">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-center items-center">
        {totalBooks > 0 ? (
          booksList!.map((book) => (
            <Dialog key={book.id}>
              <DialogTrigger asChild>
                <div>
                  <BookCard key={book.id} title={book.title} author={book.author} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
                <div className="flex h-[500px] md:h-full">
                  <div className="w-1/2 p-6 flex justify-center items-center bg-gray-100">
                    <Image
                      src='/BookCover.png'
                      alt={`Cover of ${book.title}`}
                      width={250}
                      height={375}
                      objectFit="contain"
                    />
                  </div>
                  <div className="w-1/2 p-6 flex flex-col justify-between">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-black mb-2">
                        {book.title}
                      </DialogTitle>
                      <p className="text-sm text-gray-600 italic">
                        by {book.author}
                      </p>
                    </DialogHeader>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {book.pages} pages
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          {book.publisher}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          ISBN: {book.isbnNo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <BookCopy className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.availableCopies} of {book.totalCopies} available
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.totalCopies - book.availableCopies} borrowed
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <DialogFooter>
                    <p className="text-xl font-semibold text-gray-900">₹{book.price}</p>
                      <BorrowBook bookId={book.id} memberId={memberId as number} />
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <p className="col-span-3 text-center text-black">No books found for `{query}`</p>
        )}
      </div>
      {totalBooks > 0 ? (
        <PaginationControls totalBooks={totalBooks} limit={limit} />
      ) : null}
    </div>
  )
}

export default HomePage
