import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IMember } from "../../models/member.model";

export function EditProfileForm({userInformation}:{userInformation:IMember|undefined}) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700">
            First Name
          </Label>
          <Input
            id="firstName"
            defaultValue={userInformation?.firstName}
            className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 focus:border-[#2c3e50] focus:ring-[#2c3e50]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700">
            Last Name
          </Label>
          <Input
            id="lastName"
            defaultValue={userInformation?.lastName}
            className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 focus:border-[#2c3e50] focus:ring-[#2c3e50]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            defaultValue={userInformation?.phone ?? ""}
            className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 focus:border-[#2c3e50] focus:ring-[#2c3e50]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            defaultValue={userInformation?.email}
            className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 focus:border-[#2c3e50] focus:ring-[#2c3e50]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-700">
          Address
        </Label>
        <Textarea
          id="address"
          defaultValue={userInformation?.address}
          className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 focus:border-[#2c3e50] focus:ring-[#2c3e50]"
        />
      </div>
      <Button className="w-full bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] hover:from-gray-400 hover:to-gray-600 text-white">
        Save Changes
      </Button>
    </form>
  );
}
