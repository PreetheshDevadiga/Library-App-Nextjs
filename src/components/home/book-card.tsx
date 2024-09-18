"use client"

import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';

interface BookCardProps {
  title: string;
  author: string;
}

const BookCard = ({ title, author }: BookCardProps) => {
  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105 bg-white flex flex-col">
      <CardHeader className="p-4 flex-shrink-0">
        <div className="relative w-full h-48">
          <Image
            src="/BookCover.png" 
            alt={`${title} cover`}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 flex flex-col flex-grow">
        <div>
          <h2 className="font-semibold text-gray-900 text-lg leading-tight mb-1 line-clamp-1">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">{author}</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-900">₹765</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;