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
  
  // State to keep track of the selected filter
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get("filter") || "All");

  // UseEffect to handle URL changes or pathname/replace changes
  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "All";
    setSelectedFilter(currentFilter); // Set initial value based on URL
  }, [searchParams, pathname, replace]);

  const handleFilterOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset the page to 1 on filter change

    if (selectedValue === "All") {
      params.delete("filter"); // Remove filter when 'All' is selected
    } else {
      params.set("filter", selectedValue);
    }

    replace(`${pathname}?${params.toString()}`);
    router.refresh(); // Refresh the page after the URL is updated
  };

  return (
    <select
      className="p-2 border rounded-md"
      value={selectedFilter} // Set the value based on selectedFilter state
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
