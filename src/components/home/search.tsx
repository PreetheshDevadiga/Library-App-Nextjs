'use client';

import { Input } from "../ui/input";
import React, { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslations } from 'next-intl';

export function SearchBar() {
  const t = useTranslations('searchBar');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  }, 300);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setSearchQuery(currentQuery);
  }, [searchParams, pathname]);

  const getPlaceholder = () => {
    if (pathname.includes("home")) {
      return t('placeholderBooks');
    } else if (pathname.includes("members")) {
      return t('placeholderMembers');
    }
    return t('placeholderDefault');
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder={getPlaceholder()}
          className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white placeholder-gray-400 border-none rounded-full pl-12 pr-4 py-3 shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 ease-in-out"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-20 blur-xl pointer-events-none"></div>
    </div>
  );
}
