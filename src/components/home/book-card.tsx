
import React from 'react'
import { Card } from '../ui/card'
import BorrowBook from "./borrowBook"

interface BookCardProps {
  memberId:number
  bookId:number
    title: string
    author: string
    availableCopies: number
  }


const BookCard = ({ memberId,bookId,title, author, availableCopies }:BookCardProps) => {
 
  return (

    <Card className="w-full max-w-md p-6 grid gap-6">
    <div className="flex items-center  gap-4">
    {/* <Image
      src=""
      width={100}
      height={150}
      alt="Book Cover"
      className="rounded-md"
      style={{ objectFit: 'cover' }}
    /> */}
      <div className="flex-1 grid gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="text-muted-foreground">
          <span className="font-medium">{author}</span>
        </div>
        <div className="text-sm text-muted-foreground">Available Copies: {availableCopies}</div>
      </div>
    </div>
    <div className="flex justify-end">
    <BorrowBook memberId={memberId} bookId={bookId}/>
    </div>
  </Card>
  )
}

export default BookCard
