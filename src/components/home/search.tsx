'use client'

import { Search } from "lucide-react"
import { Input } from "../ui/input"
import {Button} from '../ui/button'
import React, { Suspense } from 'react'
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; 
import {  useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar(){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page','1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const getPlaceholder = () => {
    if (pathname.includes("books")) {
      return "Search books...";
    } else if (pathname.includes("members")) {
      return "Search members...";
    }
    return "Search...";
  };
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative flex flex-1 flex-shrink-0">
              <Input
                type="text"
                placeholder={ getPlaceholder() }
                className="bg-white pl-8 w-full max-w-xs"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()}        
              />
              {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            </Suspense>
    )
}