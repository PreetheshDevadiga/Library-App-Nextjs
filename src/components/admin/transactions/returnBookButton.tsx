"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { BookUp } from "lucide-react";
import { returnBook } from "@/lib/action"
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReturnBookProps {
  bookId: number;
  bookTitle: string;
  transactionStatus: string;
}

export function ReturnBookButton({ bookId, bookTitle, transactionStatus }: ReturnBookProps) {
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
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-[#635BFF] hover:text-[#4C45B6] hover:bg-[#635BFF]/10 focus:ring-2 focus:ring-[#635BFF] focus:ring-offset-2 focus:ring-offset-[#1A1F36] transition-colors ${isDisabled ? 'hidden' : ''}`}
        >
          <BookUp className="h-4 w-4 mr-2" />
          Return
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F36] border border-[#2D3348] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Confirm Return</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-[#A3ACBF]">
            Are you sure you want to return the book &quot;{bookTitle}&quot;?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <div className="flex flex-col  sm:flex-row gap-2 sm:gap-4 w-full">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto bg-transparent border-[#2D3348] text-white hover:bg-[#242B42] hover:text-white transition-colors"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleReturn}
              className="w-full sm:w-auto bg-[#635BFF] hover:bg-[#4C45B6] text-white transition-colors"
            >
              Confirm Return
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}