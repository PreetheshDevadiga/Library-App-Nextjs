"use client";

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { EditBook } from './editBook';
import { DeleteBook } from './deleteBook';
import { IBook } from '@/models/book.model';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';

type BooksTableProps = {
  booksList: IBook[];
  totalBooks: number;
  query: string;
};

type SortOrder = 'asc' | 'desc';
type SortColumn = 'title' | 'author';

const BooksTable = ({ booksList, totalBooks, query }: BooksTableProps) => {
  const searchParams= useSearchParams();
  const pathname=usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortColumn, setSortColumn] = useState<SortColumn>('title');

  const handleSort = (column: SortColumn) => { 
    if (column) {
      params.set('sortBy', column);
      params.set('orderBy',sortOrder)
    } else {
      params.delete('sortBy');
      params.delete('orderBy');
    }
    replace(`${pathname}?${params.toString()}`);
    
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  return (
    <div className="rounded-md bg-white border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[150px] cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Title {sortColumn === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('author')}
            >
              Author {sortColumn === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Pages</TableHead>
            <TableHead>Total Copies</TableHead>
            <TableHead>Available Copies</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalBooks > 0 ? (
            booksList.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.isbnNo}</TableCell>
                <TableCell>{book.pages}</TableCell>
                <TableCell>{book.totalCopies}</TableCell>
                <TableCell>{book.availableCopies}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <EditBook id={book.id} />
                    <DeleteBook bookId={book.id} bookTitle={book.title} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-black">
                No books found for `{query}`
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};


export default BooksTable;
