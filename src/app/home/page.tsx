import React from "react";
import BookCard from "@/components/home/book-card";
import { SearchBar } from "@/components/home/search";
import PaginationControls from "@/components/home/pagination";
import { fetchBooks, fetchUserDetails } from "@/lib/action";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BorrowBook from "@/components/home/borrowBook";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Building, BookCopy, Users } from "lucide-react";
import Image from "next/image";
import SortBooks from "@/components/admin/books/sortBooks";

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortBy?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const sortBy = searchParams?.sortBy || "id";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 8;
  const offset = (Number(currentPage) - 1) * limit;

  const booksResponse = await fetchBooks(query, limit, offset, sortBy);
  const memberDetails = await fetchUserDetails();
  const memberId = memberDetails?.userDetails.id;
  const booksList = booksResponse?.items;
  const totalBooks = Number(booksResponse?.pagination.total);

  return (
    <div className="flex flex-col gap-6 bg-[#F6F9FC] min-h-screen p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <SearchBar />
        <SortBooks />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {totalBooks > 0 ? (
          booksList!.map((book) => (
            <Dialog key={book.id}>
              <DialogTrigger asChild>
                <div>
                  <BookCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    imageUrl={book.imageUrl}
                    bookId={book.id}
                    memberId={memberId as number}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-lg">
                <div className="flex flex-col md:flex-row h-auto md:h-full">
                  {/* Left Section: Book Image */}
                  <div className="w-full md:w-1/2 p-6 flex justify-center items-center bg-[#F6F9FC]">
                    <Image
                      src={book.imageUrl || '/BookCover.png'}
                      alt={`Cover of ${book.title}`}
                      width={250}
                      height={375}
                      className="object-contain rounded-md shadow-lg"
                    />
                  </div>
                  
                  {/* Right Section: Book Info */}
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6 bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#0A2540] mb-1">
                        {book.title}
                      </DialogTitle>
                      <p className="text-sm text-[#4F5E74] italic">by {book.author}</p>
                    </DialogHeader>
              
                    <Separator className="my-4 bg-[#E3E8EF]" />
              
                    <div className="space-y-4">
                      {/* Book Details */}
                      <div className="flex items-center space-x-2 text-[#4F5E74]">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">{book.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#4F5E74]">
                        <Building className="h-4 w-4" />
                        <span className="text-sm font-medium">{book.publisher}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#4F5E74]">
                        <span className="text-sm font-medium">ISBN: {book.isbnNo}</span>
                      </div>
              
                      {/* Availability */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[#4F5E74]">
                          <BookCopy className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {book.availableCopies} of {book.totalCopies} available
                          </span>
                        </div>
                      </div>
                    </div>
              
                    <Separator className="my-4 bg-[#E3E8EF]" />
              
                    {/* Footer: Price and Borrow Button */}
                    <DialogFooter className="flex justify-between items-center sm:flex sm:flex-row sm:justify-between md:flex md:flex-row md:justify-between">
                      <p className="text-xl font-semibold text-[#0A2540]">₹765</p>
                      <BorrowBook bookId={book.id} memberId={memberId as number} />
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <p className="col-span-full text-center text-[#4F5E74] text-lg">
            No books found for `{query}`
          </p>
        )}
      </div>
      {totalBooks > 0 ? (
        <div className="mt-8">
          <PaginationControls totalBooks={totalBooks} limit={limit} />
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;