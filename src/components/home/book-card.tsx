import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import BorrowBook from "./borrowBook";
import Image from 'next/image';

interface BookCardProps {
  memberId: number;
  bookId: number;
  title: string;
  author: string;
  availableCopies: number;
  totalCopies: number;
}

const BookCard = ({ memberId, bookId, title, author, availableCopies, totalCopies }: BookCardProps) => {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      
      <div className="flex justify-center items-center  mt-3">
        <Image
          src="/BookCover.png"
          alt={`${title} cover`}
          width={200}
          height={400}
        />
      </div>
      
      <CardContent className="p-4">
        <h2 className="mb-2 text-xl font-bold leading-tight text-primary sm:text-2xl">{title}</h2>
        <p className="mb-4 text-sm text-muted-foreground sm:text-base">{author}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">$14.20</span>
          <span className="text-sm text-green-600">Available: {availableCopies}/{totalCopies}</span>
        </div>
      </CardContent>
      <div className="flex justify-end items-end">
      <CardFooter>
        <BorrowBook memberId={memberId} bookId={bookId} />
      </CardFooter>
      </div>
    </Card>
  );
}

export default BookCard;
