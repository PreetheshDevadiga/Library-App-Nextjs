"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { ProfileDropDown } from "../profile/profiledropDownUser";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "../ui/button";

export const NavBar = ({ children }: { children: React.ReactNode }) => {

  return (
    <nav className="bg-[#0D2E4B] sticky top-0 shadow-lg text-white p-4 z-50">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <ProfileDropDown>{children}</ProfileDropDown>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#A3B8CC] hover:text-white transition-colors duration-200"
          >
          </Button>
        </div>
      </div>
    </nav>
  );
};

