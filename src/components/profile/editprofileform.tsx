"use client";

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
import { useTranslations } from "next-intl";

export function EditProfileForm({
  userInformation,
}: {
  userInformation: IMember | undefined;
}) {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(editMember, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("EditProfileForm");
  const path =
    userInformation?.role === "admin"
      ? "/admin/viewprofile"
      : "/home/viewprofile";

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: t("toast.successTitle"),
        description: t("toast.successDescription"),
        duration: 1500,
        className: "bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] shadow-lg",
      });
      router.push(path);
    }
  }, [state.message, toast, router, path, t]);

  return (
    <form action={formAction} className="space-y-6 bg-[#0D2E4B] px-6 py-3 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-[#A3B8CC]">
            {t("form.firstName")}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={userInformation?.firstName}
            type="text"
            placeholder={t("form.firstName")}
            required
            className="w-full bg-[#1A3550] border-[#2A4A6A] text-white placeholder-[#6B7C93] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-[#A3B8CC]">
            {t("form.lastName")}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={userInformation?.lastName}
            type="text"
            placeholder={t("form.lastName")}
            required
            className="w-full bg-[#1A3550] border-[#2A4A6A] text-white placeholder-[#6B7C93] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-[#A3B8CC]">
            {t("form.phone")}
          </Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={userInformation?.phone ?? ""}
            type="tel"
            placeholder={t("form.phone")}
            required
            className="w-full bg-[#1A3550] border-[#2A4A6A] text-white placeholder-[#6B7C93] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#A3B8CC]">
            {t("form.email")}
          </Label>
          <Input
            id="email"
            name="email"
            defaultValue={userInformation?.email}
            type="email"
            placeholder={t("form.email")}
            required
            className="w-full bg-[#1A3550] border-[#2A4A6A] text-white placeholder-[#6B7C93] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium text-[#A3B8CC]">
            {t("form.address")}
          </Label>
          <Textarea
            id="address"
            name="address"
            defaultValue={userInformation?.address}
            placeholder={t("form.address")}
            required
            className="w-full bg-[#1A3550] border-[#2A4A6A] text-white placeholder-[#6B7C93] focus:border-[#00D4FF] focus:ring-[#00D4FF] min-h-[100px]"
          />
        </div>
      </div>
      <Button 
        className="w-full mt-6 bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl" 
        type="submit"
      >
        {t("form.saveChanges")}
      </Button>
    </form>
  );
}