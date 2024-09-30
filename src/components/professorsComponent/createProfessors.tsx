"use client";

import React from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { User, Mail, Briefcase, FileText } from "lucide-react";
import { toast } from "../../components/use-toast";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { addProfessor } from "../../lib/action";

interface State {
  errors: any;
  message: string;
}

export function CreateProfessorForm() {
  const router = useRouter();
  const initialState: State = { message: "", errors: {} };

  const [state, formAction] = useActionState(addProfessor, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#0D2E4B] text-white border border-[#1A3550]">
      <CardHeader className="pb-4 md:pb-6 bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-[#0A2540]">
          Add New Professor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-[#A3B8CC] flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Professor name"
                autoFocus
                required
                className="w-full bg-[#1A3550]  text-white placeholder-[#6B7F95] "
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#A3B8CC] flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                className="w-full bg-[#1A3550] border-[#2A4560] text-white placeholder-[#6B7F95] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="department"
                className="text-sm font-medium text-[#A3B8CC] flex items-center"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Department
              </Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="Department Name"
                required
                className="w-full bg-[#1A3550] border-[#2A4560] text-white placeholder-[#6B7F95] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="shortBio"
                className="text-sm font-medium text-[#A3B8CC] flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Short Bio
              </Label>
              <Textarea
                name="shortBio"
                placeholder="Brief description..."
                required
                className="w-full bg-[#1A3550] border-[#2A4560] text-white placeholder-[#6B7F95] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="calendlylink"
                className="text-sm font-medium text-[#A3B8CC] flex items-center"
              >
                Calendly Link
              </Label>
              <Input
                id="calendlylink"
                name="calendlylink"
                className="w-full bg-[#1A3550] border-[#2A4560] text-white placeholder-[#6B7F95] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
              />
            </div>
          </div>
          <CardFooter className="bg-[#0A2540] p-6">
            <Button
              className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl"
              type="submit"
            >
              Add Professor
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
