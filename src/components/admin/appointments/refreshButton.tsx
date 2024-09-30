"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button"
import { updateStatus } from "../../../lib/action";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RefreshProfessor({
  professorEmail,
  status
}: {
  professorEmail: string;
  status: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Refreshing...");
      await updateStatus(professorEmail);
      router.refresh();
    } catch (error) {
      console.error("Error refreshing professor status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status.toLowerCase() !== 'pending') {
    return null;
  }

  return (
    <Button
      variant="outline"
      className="flex-1 min-w-[calc(50%-0.25rem)] bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] border-none transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
      onClick={handleRefresh}
      disabled={isLoading}
    >
      <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">{isLoading ? "Refreshing..." : "Refresh"}</span>
      <span className="sm:hidden">
        {isLoading ? "..." : "Refresh"}
      </span>
    </Button>
  );
}