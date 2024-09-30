"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { deleteBook } from "@/lib/action"
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

export function DeleteTransaction({transactionId}: {transactionId: number}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteBook(transactionId);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-red-500 hover:text-red-300 hover:bg-red-400/10 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#1A1F36] transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F36] border border-[#2D3348] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Confirm Deletion</DialogTitle>
          <DialogDescription className="text-[#A3ACBF]">
            Are you sure you want to delete the transaction with transaction Id &quot;{transactionId}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="bg-transparent border-[#2D3348] text-white hover:bg-[#242B42] hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}