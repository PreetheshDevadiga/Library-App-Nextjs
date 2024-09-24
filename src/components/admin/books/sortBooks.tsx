'use client';

import { ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

export default function SortBooks() {
  const t = useTranslations('sortBooks');
  const statuses = [
    { key: "All", label: t('all') },
    { key: "Title", label: t('title') },
    { key: "Author", label: t('author') }
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = searchParams.get("sortBy") || t('all');

  const handleFilterOptionChange = (selectedFilter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (selectedFilter && selectedFilter !== "All") {
      params.set("sortBy", selectedFilter);
    } else {
      params.delete("sortBy");
    }
    replace(`${pathname}?${params.toString()}`);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentSort}</span>
        <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-xl">
          {statuses.map((status) => (
            <button
              key={status.key}
              className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-200"
              onClick={() => handleFilterOptionChange(status.key)}
            >
              {status.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
