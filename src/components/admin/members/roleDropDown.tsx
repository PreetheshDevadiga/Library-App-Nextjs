"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { updateMemberRole } from "@/lib/action";
import { ChevronDown } from "lucide-react";

export default function RoleDropdown({ memberId, memberRole }: { memberId: number, memberRole: string }) {
  const [role, setRole] = useState(memberRole);
  const router = useRouter();

  const handleRoleChange = async (newRole: string) => {
    setRole(newRole);
    await updateMemberRole(memberId, newRole);
    router.refresh();
  };

  return (
    <div className="px-2">
      <Select
        value={role}
        onValueChange={(newRole) => handleRoleChange(newRole)}
      >
        <SelectTrigger className="w-full bg-[#242B42] border-[#2D3348] text-white hover:bg-[#2D3348] focus:ring-[#635BFF] focus:ring-offset-[#1A1F36] focus:ring-offset-2 transition-colors">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent className="bg-[#242B42] border-[#2D3348] text-white">
          <SelectItem value="user" className="hover:bg-[#2D3348] focus:bg-[#2D3348] focus:text-white">
            User
          </SelectItem>
          <SelectItem value="admin" className="hover:bg-[#2D3348] focus:bg-[#2D3348] focus:text-white">
            Admin
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}