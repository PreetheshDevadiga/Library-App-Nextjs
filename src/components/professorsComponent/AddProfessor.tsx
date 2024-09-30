import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import React from "react"

export function AddProfessor() {
  return (
    <Button
      asChild
      className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl"
    >
      <Link href="/admin/Professors/create" className="flex items-center space-x-2">
        <span className="hidden sm:inline">Add Professor</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  )
}