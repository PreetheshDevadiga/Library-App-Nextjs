"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useRouter } from "next/navigation";
import { updateMemberRole } from "@/lib/action";

export default function RoleDropdown({ memberId,memberRole }: { memberId: number ,memberRole:string}) {
  const [role, setRole] = useState(memberRole);
  const router = useRouter();

  // This function will be called immediately when a new role is selected
  const handleRoleChange = async (newRole: string) => {
    setRole(newRole); // Update local state
    await updateMemberRole(memberId, newRole); // Call the API or function to update role in the backend
    router.refresh(); // Refresh the UI after update
  };

  return (
    <div className="px-4">
      <Select
        value={role}
        onValueChange={(newRole) => handleRoleChange(newRole)} // Directly handle role change
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
