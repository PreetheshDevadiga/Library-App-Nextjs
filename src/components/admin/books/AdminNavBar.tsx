"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button"
import { User, Menu, ChevronDown} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ProfileDropDown } from "../../profile/profileDropdown";

export const AdminNavBar = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-md  text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
        BookShelf
        </h1>
        <div className="flex flex-row justify-center items-center gap-8">
          <div className="hidden md:flex space-x-4">
            <Link className={clsx({
                'text-blue-600': pathname === "/admin"
              },)} href="/admin">
              All Books
            </Link>
            <Link className={clsx({
                'text-blue-600': pathname === "/admin/members"
              },)} href="/admin/members">
              All Members
            </Link>
            <Link className={clsx({
                'text-blue-600': pathname === "/admin/transaction"
              },)} href="/admin/transaction">
             Transaction
            </Link>
          </div>
          {/* <div className="flex items-center space-x-4">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>John Doe</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">john@example.com</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>  
                  {children}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div> */}
          <ProfileDropDown>
            {children}
          </ProfileDropDown>
        </div>
      </div>
    </nav>
  );
};
