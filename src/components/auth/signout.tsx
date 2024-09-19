'use client '
import React from "react";
import { signOut } from "../../auth";
import {LogOut } from "lucide-react"
import { Button } from "../ui/button"

export const LogoutForm=()=>{
    return (
        <>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <div className="flex flex-row items-center">
          <Button variant="destructive" className="flex h-[40px] bg-red-500  grow items-center  gap-2 rounded-md  text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 md:bg-red-500">
          <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
          </div>
        </form>
        </>
    )
}