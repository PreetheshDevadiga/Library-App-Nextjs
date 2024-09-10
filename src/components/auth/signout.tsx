'use client '
import React from "react";
import { signOut } from "../../auth";
import {LogOut } from "lucide-react"

export const LogoutForm=()=>{
    return (
        <>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <div className="flex flex-row gap-1 items-center">
          
          <button className="flex h-[48px] hover:bg-gray-100 grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
          </button>
          </div>
        </form>
        </>
    )
}