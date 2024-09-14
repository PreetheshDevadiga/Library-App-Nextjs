"use client";

import React, { useState } from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ProfileDropDown } from "../../profile/profileDropdown";
import { SearchBar } from "@/components/home/search";

export const AdminNavBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-md sticky top-0   text-black p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
      <SearchBar />
        <div className="flex flex-row justify-center items-center gap-8">
          <ProfileDropDown>
            {children}
          </ProfileDropDown>
        </div>
      </div>
    </nav>
  );
};
