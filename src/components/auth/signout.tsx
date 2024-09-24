'use client '
import React from "react";
import { signOut } from "../../auth";
import {LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl";

export const LogoutForm=()=>{
  const t = useTranslations('logout');

    return (
        <>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button
        variant="ghost"
        className="w-full px-3 justify-start text-red-400 hover:text-red-300 hover:bg-[#242B42] focus:bg-[#242B42] transition-colors"
      >
        <LogOut className="h-4 w-4 mr-2" />
        {t('logOut')}
      </Button>
        </form>
        </>
    )
}