import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';

interface BookCardProps {
  title: string;
  author: string;
}

const BookCard = ({ title, author}: BookCardProps) => {
  return (
    <Card className="p-0 max-w-xs sm:max-w-sm md:max-w-md overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
      {/* Book Cover */}
      <CardHeader className="flex justify-center items-center p-0 bg-white">
        <Image
          src="/BookCover.png"
          alt={`${title} cover`}
          width={200}
          height={260} 
          className="rounded-t-lg w-full h-auto object-contain"
        />
      </CardHeader>

      {/* Book Title and Author */}
      <CardContent className="p-4 text-center bg-white">
        <h2 className="mb-2 font-bold leading-tight text-primary text-base sm:text-lg md:text-xl">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">{author}</p>
      </CardContent>
    </Card>
  );
};

export default BookCard;
