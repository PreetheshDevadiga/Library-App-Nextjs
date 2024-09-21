"use client"

import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IMember } from "../../models/member.model";
import { useActionState } from "react";
import { State, editMember } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";

export function EditProfileForm({
  userInformation,
}: {
  userInformation: IMember | undefined;
}) {
    const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(editMember, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const path =
  userInformation?.role === "admin" ? "/admin/viewprofile" : "/home/viewprofile";

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Member edited successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push(path);
    }
  }, [state.message, toast, router, path]);
  
  return (
    <form action={formAction} className="space-y-4 md:space-y-6">
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
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Textarea
                id="address"
                name="address"
                defaultValue={userInformation?.address}
                placeholder="Address"
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
