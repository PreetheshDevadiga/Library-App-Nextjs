"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Mail, Edit, LogOut } from "lucide-react";
import { fetchUserDetails } from "../../lib/action";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl"

interface ProfileDropDownProps {
  children: React.ReactNode;
}

export function ProfileDropDown({ children }: ProfileDropDownProps) {
  const pathname = usePathname();
  const [userProfileDetails, setUserProfileDetails] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const t=useTranslations('viewprofile');

  useEffect(() => {
    async function getUserDetails() {
      const data = await fetchUserDetails();
      setUserProfileDetails(data);
    }
    getUserDetails();
  }, []);

  const userRegistredWithCredentials = userProfileDetails?.userDetails;
  const userRegistredWithGoogle = userProfileDetails?.user;
  const userImage = userProfileDetails?.user?.image;
  const userName = userRegistredWithGoogle?.name || userRegistredWithCredentials?.firstName;
  const userEmail = userRegistredWithGoogle?.email || userRegistredWithCredentials?.email;

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-purple-500 transition-all hover:ring-4">
          <AvatarImage src={userImage || "/user.png"} alt="Profile" />
          <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-[#1A1F36] border-[#2D3348] text-white" align="end">
        {/* <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-gray-400">{userEmail}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-[#2D3348]" /> */}
        <DropdownMenuItem className="focus:bg-[#242B42] focus:text-white" onClick={() => setIsDropdownOpen(false)}>
          <Link
            href="/home/viewprofile"
            className={clsx("flex w-full items-center px-2 py-2", {
              "text-[#635BFF]": pathname === "/home/viewprofile",
            })}
          >
            <Edit className="mr-2 h-4 w-4" />
           <span>{t('viewprofile')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#242B42] focus:text-white">
          {children}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}