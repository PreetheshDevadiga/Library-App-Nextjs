'use client';

import { Input } from "../ui/input";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const [searchQuery, setSearchQuery] = useState<string | null>(searchParams.get("query"));

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setSearchQuery(currentQuery); 
  }, [searchParams, pathname, replace]);

  const getPlaceholder = () => {
    if (pathname.includes("books")) {
      return "Search books...";
    } else if (pathname.includes("members")) {
      return "Search members...";
    }
    return "Search...";
  };

  return (
      <div className="relative flex flex-1 flex-shrink-0">
        <Input
          type="text"
          placeholder={getPlaceholder()}
          className="bg-white pl-8 w-full max-w-xs"
          value={searchQuery || ''}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
      </div>

  );
}
