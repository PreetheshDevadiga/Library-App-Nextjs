"use client"

import { CheckIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { aproveTransaction } from "../../../lib/action";
import { useRouter } from "next/navigation";

export async  function AproveTransactionButton({transaction}) {
  const router=useRouter();
    async function handleAprove() {
        await aproveTransaction(Number(transaction.id));
        router.refresh();
  }

 const isDisabled = transaction.status !== "Pending"
  return (
    <Button
      variant="outline"
      size="icon"
      className="text-green-500"
    onClick={handleAprove} 
    disabled={isDisabled} 
    
    >
      <CheckIcon className="h-4 w-4" />
      <span className="sr-only">Approve</span>
    </Button>
  );
}
