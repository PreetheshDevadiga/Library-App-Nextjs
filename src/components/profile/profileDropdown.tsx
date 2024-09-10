import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
  } from "../../components/ui/dropdown-menu";
  import { User, ChevronDown, Menu, Edit } from "lucide-react";
  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { fetchUserDetails } from "../../lib/action";
  
  interface ProfileDropDownProps {
    children: React.ReactNode;
  }
  
  export function ProfileDropDown({ children }: ProfileDropDownProps) {
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
            <DropdownMenuItem>
              <span className="ml-6">{userRegistredWithGoogle?.name || userRegistredWithCredentials?.firstName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="ml-6">{userRegistredWithGoogle?.email || userRegistredWithCredentials?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Profile </span>
            </DropdownMenuItem>
            <DropdownMenuItem>{children}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       
      </div>
    );
  }
  