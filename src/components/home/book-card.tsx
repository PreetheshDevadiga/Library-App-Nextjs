'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from 'next/image'
import BorrowBook from './borrowBook'
import { useTranslations } from 'next-intl' // Import useTranslations

interface BookCardProps {
  bookId: number
  memberId: number
  title: string
  author: string
  imageUrl: string | null
  price: number
}

const BookCard = ({ title, author, imageUrl, bookId, memberId, price }: BookCardProps) => {
  const t = useTranslations('bookCard') // Load translations for bookCard
  const imageSrc = imageUrl || '/BookCover.png'

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-[#ffffff0d] backdrop-blur-sm border border-[#ffffff1a]">
      <CardHeader className="p-4">
        <div className="relative w-full aspect-square">
          <Image
            src={imageSrc}
            alt={`${title} cover`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 flex flex-col">
        <h2 className="font-semibold text-[#80E9FF] text-lg leading-tight mb-2 line-clamp-1">
          {title}
        </h2>
        <p className="text-[#A3B8CC] text-sm mb-3 leading-tight line-clamp-1">
          {author}
        </p>
        <div className='flex flex-row justify-between items-center mt-auto'>
          <p className="text-xl font-semibold text-[#80E9FF]">
            {t('currencySymbol')}{price} {/* Use localized currency symbol */}
          </p>
          <BorrowBook memberId={memberId} bookId={bookId} />
        </div>
      </CardContent>
    </Card>
  )
}

export default BookCard
