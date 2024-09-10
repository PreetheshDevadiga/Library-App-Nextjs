"use client"

import { XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { rejectRequest } from "../../../lib/action";

export async function RejectRequestButton({ transaction }) {
  const router = useRouter();
  async function handleRejection() {
    await rejectRequest(Number(transaction.id));
    router.refresh();
  }

  const isDisabled = transaction.status !== "Pending"
  
  return (
    <Button
      variant="outline"
      size="icon"
      className="text-red-500"
      onClick={handleRejection}
      disabled={isDisabled}
    >
      <XIcon className="h-4 w-4" />
      <span className="sr-only">Reject</span>
    </Button>
  );
}
