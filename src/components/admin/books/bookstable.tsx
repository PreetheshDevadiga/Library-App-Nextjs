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

type BooksTableProps = {
  booksList: IBook[];
  totalBooks: number;
  query: string;
};

type SortOrder = 'asc' | 'desc';
type SortColumn = 'title' | 'author';

const BooksTable = ({ booksList, totalBooks, query }: BooksTableProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortColumn, setSortColumn] = useState<SortColumn>('title');
  const [sortedBooks, setSortedBooks] = useState<IBook[]>(booksList);

  useEffect(() => {
    setSortedBooks(booksList);
  }, [booksList]);


  const handleSort = (column: SortColumn) => {
    const sorted = [...sortedBooks].sort((a, b) => {
      const comparison = a[column].localeCompare(b[column]);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setSortedBooks(sorted);
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
            sortedBooks.map((book) => (
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
