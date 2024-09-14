import React from 'react'
import BookCard  from '@/components/home/book-card'
import { SearchBar } from "@/components/home/search"
import PaginationControls from '@/components/home/pagination'
import { fetchBooks, fetchMember, fetchUserDetails } from "@/lib/action";

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}){
  const query: string = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;

  const booksResponse = await fetchBooks(query,limit,offset);
 const memberDetails= await fetchUserDetails();
 const memberId= memberDetails?.userDetails.id;
  const booksList=booksResponse?.items
  const totalBooks=Number(booksResponse?.pagination.total);
  console.log(totalBooks)
  

  return (
    <div className="flex flex-col gap-2">
    <div className="mb-6 flex flex-row justify-between">
            <SearchBar />
            
          </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {totalBooks! > 0 ? (
          booksList!.map((book) => (
            <BookCard
              key={book.id}
              memberId={memberId!}
              bookId={book.id}
              title={book.title}
              author={book.author}
              availableCopies={book.availableCopies}
              totalCopies={book.totalCopies}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-black">No books found for `{query}`</p>
        )}
    </div>
    {totalBooks! > 0 ? (<PaginationControls 
         totalBooks={totalBooks}
         limit={limit}
      />):<></>}
    </div>
  )
}

export default HomePage;