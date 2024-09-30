"use client";

import { Check } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { aproveTransaction } from "@/lib/action";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AproveTransactionButton({ transaction, bookTitle }: { transaction: any, bookTitle: string | null }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleAprove = async () => {
    await aproveTransaction(Number(transaction.id));
    setIsOpen(false);
    router.refresh();
  };

  const isDisabled = transaction.status !== "Pending";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-green-400 hover:text-green-300 hover:bg-green-400/10 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#1A1F36] transition-colors ${isDisabled ? 'hidden' : ''}`}
          disabled={isDisabled}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Approve</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F36] border border-[#2D3348] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Confirm Approval</DialogTitle>
          <DialogDescription className="text-[#A3ACBF]">
            Do you confirm your decision to approve the transaction for ID {transaction.id} and the book titled &apos;{bookTitle}&apos;? 
            <br />Please note that this action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end ">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="bg-transparent border-[#2D3348] text-white hover:bg-[#242B42] hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleAprove}
            className="bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}