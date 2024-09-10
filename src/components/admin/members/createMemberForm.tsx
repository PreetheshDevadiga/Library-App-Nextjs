"use client";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { useActionState } from "react";
import { addNewMember, State } from "../../../lib/action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

export function CreateMemberForm() {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(addNewMember, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          Add New Member
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                autoFocus
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
                type="email"
                placeholder="Email"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select  defaultValue="user">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>

          <Button className="w-full mt-4 md:mt-6" type="submit">
            Add Member
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
