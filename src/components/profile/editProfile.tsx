import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
import { EditProfileForm } from "./editprofileform";
import { IMember } from "../../models/member.model";

export default function EditProfile({userInformation}:{userInformation:IMember|undefined}) {

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] p-6 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile picture" />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">{ userInformation?.firstName } </h1>
            <p className="text-gray-200">{userInformation?.email}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
        <EditProfileForm userInformation={userInformation}/>
      </div>
    </div>
  );
}
