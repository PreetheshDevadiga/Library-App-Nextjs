"use client";

import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { rejectRequest } from "../../../lib/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export function RejectRequestButton({ transaction ,bookTitle}: { transaction: any ,bookTitle:string|null}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRejection = async () => {
    await rejectRequest(Number(transaction.id));
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
            
            className={`text-red-500 ${isDisabled ? 'hidden' : ''}`}
            disabled={isDisabled}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Reject</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Rejection</DialogTitle>
            <DialogDescription>
              Do you really want to reject the transaction for ID &apos;
              {transaction.id}&apos; regarding the book titled &apos;{bookTitle}&apos;? <br />
              Please be aware that this action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejection}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
