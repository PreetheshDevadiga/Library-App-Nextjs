"use client";

import { useToast } from "@/components/use-toast";
import { requestBook } from "@/lib/action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BorrowBookProps {
  memberId: number;
  bookId: number;
}

export default function BorrowBook({ memberId, bookId }: BorrowBookProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleBorrow = async (e:React.MouseEvent) => {
    e.stopPropagation();
    try {
      
      const result = await requestBook(memberId, bookId);
      if (result) {
        toast({
          title: "Borrowing Successful",
          description: "The book has been successfully borrowed.",
          duration: 2000,
          className: "bg-green-500 text-white",
        });
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        throw new Error("Failed to borrow book");
      }
    } catch (error) {
      console.error("Failed to borrow the book:", error);
      toast({
        title: "Error",
        description: "Failed to borrow the book. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
      <Button onClick={handleBorrow}>Borrow</Button>

  );
}
