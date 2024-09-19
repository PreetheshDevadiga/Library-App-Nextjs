"use client"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
  } from "../../components/ui/dropdown-menu";
  import { User, ChevronDown, Menu, Edit, Mail } from "lucide-react";
  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { fetchUserDetails } from "../../lib/action";
  import clsx from "clsx";
  import Link from "next/link";
  import { usePathname } from "next/navigation";

  interface ProfileDropDownProps {
    children: React.ReactNode;
  }
  
  export function ProfileDropDown({ children }: ProfileDropDownProps) {
    const pathname = usePathname();
    const [userProfileDetails, setUserProfileDetails] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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

    return (
      <div className="flex items-center space-x-4">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            {userImage ? (
              <Image
                src={userImage}
                alt="Profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            ) : (
                <Image
                src={"/user.png"}
                alt="Profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="end">
            <DropdownMenuItem >
            <User className="mr-2 h-4 w-4" />
              <span className="ml-3">{userRegistredWithGoogle?.name || userRegistredWithCredentials?.firstName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span className="ml-3">{userRegistredWithGoogle?.email || userRegistredWithCredentials?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
             <div onClick={()=>!setIsDropdownOpen} className="flex flex-row">
               <Edit className="mr-2 h-4 w-4" />
              <Link
              className={clsx("text-black hover:text-blue-600 ml-3", {
                "text-blue-600": pathname === "/home/viewprofile",
              })}
              href="/home/viewprofile"
            >
              View Profile
            </Link>
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem>{children}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       
      </div>
    );
  }
  