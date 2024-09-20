"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const handleFilterOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
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
    <select
      className="p-2 border rounded-md"
      value={selectedFilter}
      onChange={handleFilterOptionChange}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
