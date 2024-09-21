"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button"
import { BookUp } from "lucide-react";
import { returnBook } from "../../../lib/action"
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"

interface ReturnBookProps {
  bookId: number;
  bookTitle: string;
  transactionStatus:string;
}

export function ReturnBookButton({ bookId, bookTitle,transactionStatus }: ReturnBookProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleReturn = async () => {
    await returnBook(bookId);
    setIsOpen(false);
    router.refresh();
  };

  const isDisabled = transactionStatus !== "Issued";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={`text-blue-500 hover:text-blue-700 hover:bg-blue-100 ${isDisabled ? 'hidden' : ''}`}>
          <BookUp className="h-4 w-4 mr-2" />
          Return
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Confirm Return</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-500">
            Are you sure you want to return the book &quot;{bookTitle}&quot;?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleReturn}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
            >
              Confirm Return
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}