import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

export function EditBook({ id}: { id: number }) {
  return (
    <Link
      href={`/admin/books/${id}/update`} className="flex items-center space-x-2"
    >
       <Edit className="h-4 w-4" />
    </Link>
  );
}