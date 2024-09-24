"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Library, BookMarked, FileQuestion } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface SidebarProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({
  isSidebarCollapsed,
  toggleSidebar,
}: SidebarProps) => {
  const pathname = usePathname();

  const t = useTranslations('navbar');

  const navItems = [
    { href: "/home", label: t('allBooks'), icon: Library },
    { href: "/home/MyBooks", label: t('myBooks'), icon: BookMarked },
    { href: "/home/Request", label: t('myRequest'), icon: FileQuestion },
  ];

  return (
    <aside
      className={`bg-[#0D2E4B] text-white ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } h-full transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        {!isSidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#0A2540]" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
              {t('title')}
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[#A3B8CC] hover:text-white transition-colors duration-200"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-6 w-6" />
          ) : (
            <ChevronLeft className="h-6 w-6" />
          )}
        </Button>
      </div>
      <nav className="mt-8 w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center space-x-2 px-4 py-3 mb-2 mx-2 rounded-lg transition-all duration-200",
              {
                "bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] shadow-lg":
                  pathname === item.href,
                "text-[#A3B8CC] hover:bg-[#1A3550] hover:text-white":
                  pathname !== item.href,
              }
            )}
          >
            <item.icon className={`h-5 w-5 ${isSidebarCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isSidebarCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};