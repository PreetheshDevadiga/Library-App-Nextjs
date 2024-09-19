"use client"

import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function SortBooks() {
  const statuses = ["All", "Title", "Author"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterOptionChange = (e:any) => {
    const selectedFilter = e.target.value;
    console.log(selectedFilter)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); 
    if (selectedFilter) {
      params.set('sortBy', selectedFilter); 
    } else {
      params.delete('sortBy');
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
