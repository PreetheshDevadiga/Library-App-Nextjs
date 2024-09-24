"use client";

import { useToast } from "@/components/use-toast";
import { requestBook } from "@/lib/action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import React from 'react';

interface BorrowBookProps {
  memberId: number;
  bookId: number;
}

export default function BorrowBook({ memberId, bookId }: BorrowBookProps) {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('bookCard');

  const handleBorrow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await requestBook(memberId, bookId);

      if (result) {
        toast({
          title: t('borrowSuccess'),
          description: t('borrowSuccessMessage'),
          duration: 2000,
          className: "bg-green-500 text-white",
        });
        router.push("/home");
      } else {
        throw new Error("Failed to borrow book");
      }
    } catch (error) {
      console.error("Failed to borrow the book:", error);
      toast({
        title: t('error'), // use translation key for error
        description: t('borrowErrorMessage'),
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <Button onClick={handleBorrow}>
      {t('borrow')}
    </Button>
  );
}
