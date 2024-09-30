import Link from "next/link";
import { Plus } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export function AddMember() {
  return (
    <Button asChild className="bg-gradient-to-r from-[#80E9FF] to-[#635BFF] text-[#0A2540] hover:from-[#67DAFF] hover:to-[#5147FF] transition-all duration-300">
      <Link href="/admin/members/create" className="flex items-center">
        <span className="hidden md:inline mr-2">Add Member</span>
        <Plus className="h-5 w-5" />
      </Link>
    </Button>
  );
}