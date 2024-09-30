"use client";

import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { rejectRequest } from "@/lib/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RejectRequestButton({ transaction, bookTitle }: { transaction: any, bookTitle: string | null }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRejection = async () => {
    await rejectRequest(Number(transaction.id));
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
          className={`text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#1A1F36] transition-colors ${isDisabled ? 'hidden' : ''}`}
          disabled={isDisabled}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F36] border border-[#2D3348] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Confirm Rejection</DialogTitle>
          <DialogDescription className="text-[#A3ACBF]">
            Do you really want to reject the transaction for ID &apos;{transaction.id}&apos; regarding the book titled &apos;{bookTitle}&apos;? <br />
            Please be aware that this action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="bg-transparent border-[#2D3348] text-white hover:bg-[#242B42] hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRejection}
            className="bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}