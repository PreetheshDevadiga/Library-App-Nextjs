'use client'

import {  ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter, useSearchParams ,usePathname } from 'next/navigation'
import React from 'react'

interface PaginationControlsProps{
    totalBooks:number,
    limit:number
}

export default function PaginationControls({totalBooks,limit}:PaginationControlsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(totalBooks / limit)
  
    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    };
  
    const handlePageChange = (pageNumber: number | string) => {
      const url = createPageURL(pageNumber);
      router.push(url);
    };
    return (
      <div className="flex items-center justify-center mt-8 space-x-2 ">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon />
        </button>
        <div>{currentPage} / {totalPages}</div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRightIcon />
                  </button>
      </div>
    );
  }

