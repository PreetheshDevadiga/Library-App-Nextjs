'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditBook } from './editBook'
import { DeleteBook } from './deleteBook'
import { IBook } from '@/models/book.model'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

type BooksTableProps = {
  booksList: IBook[]
  totalBooks: number
  query: string
}

type SortOrder = 'asc' | 'desc'
type SortColumn = 'title' | 'author'

const BooksTable = ({ booksList, totalBooks, query }: BooksTableProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  
  const sortColumn = searchParams.get('sortBy') as SortColumn || 'title'
  const sortOrder = searchParams.get('orderBy') as SortOrder || 'asc'

  const handleSort = (column: SortColumn) => {
    const newSortOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc'
    const params = new URLSearchParams(searchParams)
    params.set('sortBy', column)
    params.set('orderBy', newSortOrder)
    router.replace(`${pathname}?${params.toString()}`)
    router.refresh()
  }

  const getSortIcon = (column: SortColumn) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="rounded-xl overflow-hidden bg-[#0F2D52] border border-[#1D3E6B] shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#1D3E6B] border-b border-[#1D3E6B] text-center">
            <TableHead
              className="w-[150px] cursor-pointer text-[#80E9FF]"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center">
                Title
                {getSortIcon('title')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer text-[#80E9FF]"
              onClick={() => handleSort('author')}
            >
              <div className="flex items-center">
                Author
                {getSortIcon('author')}
              </div>
            </TableHead>
            <TableHead className="text-[#80E9FF]">Publisher</TableHead>
            <TableHead className="text-[#80E9FF]">ISBN</TableHead>
            <TableHead className="text-[#80E9FF]">Pages</TableHead>
            <TableHead className="text-[#80E9FF]">Total Copies</TableHead>
            <TableHead className="text-[#80E9FF]">Available Copies</TableHead>
            <TableHead className="text-[#80E9FF]">Genre</TableHead>
            <TableHead className="text-[#80E9FF]">Price</TableHead>
            <TableHead className="text-center text-[#80E9FF]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalBooks > 0 ? (
            booksList.map((book) => (
              <TableRow key={book.id} className="hover:bg-[#1D3E6B] border-b border-[#1D3E6B]">
                <TableCell className="font-medium text-white">{book.title}</TableCell>
                <TableCell className="text-[#A3B8CC]">{book.author}</TableCell>
                <TableCell className="text-[#A3B8CC]">{book.publisher}</TableCell>
                <TableCell className="text-[#A3B8CC]">{book.isbnNo}</TableCell>
                <TableCell className="text-[#A3B8CC] text-center">{book.pages}</TableCell>
                <TableCell className="text-[#A3B8CC] text-center">{book.totalCopies}</TableCell>
                <TableCell className="text-[#A3B8CC] text-center">{book.availableCopies}</TableCell>
                <TableCell className="text-[#A3B8CC]">{book.genre}</TableCell>
                <TableCell className="text-[#A3B8CC]">{book.price}</TableCell>
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
              <TableCell colSpan={10} className="text-center text-[#A3B8CC]">
                No books found for `{query}`
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default BooksTable