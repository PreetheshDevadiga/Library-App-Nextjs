"use client"

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function FilterTransaction() {
  const statuses = ["All", "pending", "returned", "issued", "rejected"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterOptionChange = (e:any) => {
    const selectedFilter = e.target.value;
    console.log(selectedFilter)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); 
    if (selectedFilter) {
      params.set('filter', selectedFilter); 
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="p-2 border rounded-md"
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
