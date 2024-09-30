import Link from "next/link"
import { PlusIcon } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"

export function AddBook() {
  return (
    <Button
      asChild
      className="bg-gradient-to-r from-[#80E9FF] to-[#635BFF] text-[#0A2540] hover:from-[#67DAFF] hover:to-[#5147FF] transition-all duration-300"
    >
      <Link href="/admin/books/create" className="flex items-center">
        <span className="hidden md:inline">Add Book</span>
        <PlusIcon className="h-5 w-5 md:ml-2" />
      </Link>
    </Button>
  )
}