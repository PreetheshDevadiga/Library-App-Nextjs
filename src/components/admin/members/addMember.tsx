import Link from "next/link";
import { PlusIcon } from "lucide-react";
import React from "react";

export function AddMember() {
  return (
    <Link
      href="/admin/members/create"
      className="flex h-10 items-center rounded-lg bg-black  px-4 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Member</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
