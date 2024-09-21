import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IMember } from "../../models/member.model";

export function EditProfileForm({
  userInformation,
}: {
  userInformation: IMember | undefined;
}) {
  return (
    <form className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={userInformation?.firstName}
                type="text"
                placeholder="First Name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={userInformation?.lastName}
                type="text"
                placeholder="Last Name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={userInformation?.phone ?? ""}
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                defaultValue={userInformation?.address}
                type="text"
                placeholder="Address"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                defaultValue={userInformation?.email}
                type="email"
                placeholder="Email"
                required
                className="w-full"
              />
            </div>
           
          </div>
          <Button className="w-full mt-4 md:mt-6" type="submit">
            Save Changes
          </Button>
        </form>
  );
}
