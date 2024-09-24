import React from "react"
import { fetchBorrowedBook } from "../../../lib/action"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { BookOpen, Calendar } from "lucide-react"
import Image from "next/image"
import {getTranslations} from 'next-intl/server';

export default async function MyBooks() {
  let booksList;
  try {
    booksList = await fetchBorrowedBook();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }

  const t = getTranslations('myBooks');

  if (!booksList || booksList.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A2540] text-[#A3B8CC]">
        <p className="text-xl font-medium">{(await t)('noBooksMessage')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#0A2540] text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#80E9FF] to-[#635BFF] leading-relaxed">
        {(await t)('title')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {booksList.map(async (book) => (
          <Card
            key={book.id}
            className="bg-[#ffffff0d] backdrop-blur-sm border border-[#ffffff1a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="p-4">
              <div className="relative w-full aspect-[1/1]">
                <Image
                  src={book.imageUrl || '/BookCover.png'}
                  alt={`${book.title} cover`}
                  layout="fill"
                  objectFit="cover contain"
                  className="rounded-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-3 text-[#80E9FF] line-clamp-2">
                {book.title}
              </CardTitle>
              <div className="space-y-2 text-sm">
                <p className="text-[#A3B8CC] flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-[#635BFF]" />
                  <span className="line-clamp-1">{book.author}</span>
                </p>
                <p className="text-[#A3B8CC] flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#80E9FF]" />
                  <span>Borrow Date: {book.borrowDate}</span>
                </p>
                <p className="text-[#A3B8CC] flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#80E9FF]" />
                  <span>Due Date: {book.dueDate}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
