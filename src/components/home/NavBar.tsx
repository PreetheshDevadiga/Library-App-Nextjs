"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ProfileDropDown } from "../profile/profileDropdown";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md  text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">BookShelf</h1>
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
