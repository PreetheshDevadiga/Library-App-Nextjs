"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ProfileDropDown } from "../profile/profileDropdown";
import { BookOpen } from "lucide-react";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-white sticky top-0 shadow-md  text-black p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">BookShelf</h1>
        </div>    
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="hidden md:flex space-x-4">
            <Link
              className={clsx("hover:text-blue-200", {
                "text-blue-600": pathname === "/home",
              })}
              href="/home"
            >
              All Books
            </Link>
            <Link
              className={clsx("hover:text-blue-200", {
                "text-blue-600": pathname === "/home/MyBooks",
              })}
              href="/home/MyBooks"
            >
              My Books
            </Link>
            <Link
              className={clsx("hover:text-blue-200", {
                "text-blue-600": pathname === "/home/Request",
              })}
              href="/home/Request"
            >
              My Request
            </Link>
          </div>
          <ProfileDropDown>{children}</ProfileDropDown>
        </div>
      </div>
    </nav>
  );
};
