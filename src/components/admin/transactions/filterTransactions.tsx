"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export default function FilterTransaction() {
  const statuses = ["All", "Pending", "Returned", "Issued", "Rejected"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get("filter") || "All");

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "All";
    setSelectedFilter(currentFilter); 
  }, [searchParams, pathname, replace]);

  const handleFilterOptionChange = (selectedValue: string) => {
    setSelectedFilter(selectedValue);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (selectedValue === "All") {
      params.delete("filter");
    } else {
      params.set("filter", selectedValue);
    }

    replace(`${pathname}?${params.toString()}`);
    router.refresh(); 
  };

  return (
    <Select value={selectedFilter} onValueChange={handleFilterOptionChange}>
      <SelectTrigger className="w-[180px] bg-[#242B42] border-[#2D3348] text-white hover:bg-[#2D3348] focus:ring-[#635BFF] focus:ring-offset-[#1A1F36] focus:ring-offset-2 transition-colors">
        <SelectValue placeholder="Select filter" />
      </SelectTrigger>
      <SelectContent className="bg-[#242B42] border-[#2D3348] text-white">
        {statuses.map((status) => (
          <SelectItem 
            key={status} 
            value={status}
            className="hover:bg-[#2D3348] focus:bg-[#2D3348] focus:text-white"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}