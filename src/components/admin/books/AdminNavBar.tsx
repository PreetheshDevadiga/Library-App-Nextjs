"use client";

import React from "react";
import { Suspense } from 'react';
import { ProfileDropDown } from "../../profile/profileDropdown";
import { SearchBar } from "@/components/home/search";

export const AdminNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={
      <div className="bg-[#0A2540] text-white p-4 flex items-center justify-center">
        <div className="animate-pulse bg-[#1A3550] h-8 w-32 rounded"></div>
      </div>
    }>
      <nav className="bg-[#0A2540] shadow-lg sticky top-0 text-white p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <ProfileDropDown>
              {children}
            </ProfileDropDown>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};