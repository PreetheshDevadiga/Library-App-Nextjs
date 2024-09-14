"use client";

import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { aproveTransaction } from "../../../lib/action";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export function AproveTransactionButton({ transaction ,bookTitle}: { transaction: any ,bookTitle:string|null}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleAprove = async () => {
    await aproveTransaction(Number(transaction.id));
    setIsOpen(false);
    router.refresh();
  };

  const isDisabled = transaction.status !== "Pending";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`text-green-500 ${isDisabled ? 'hidden' : ''}`}
            disabled={isDisabled}
          >
            <CheckIcon className="h-4 w-4" />
            <span className="sr-only">Approve</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
            <DialogDescription>
            Do you confirm your decision to approve the transaction for ID {transaction.id} and the book titled &apos;{bookTitle}&apos;? 
            <br />Please note that this action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleAprove}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
