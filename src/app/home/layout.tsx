import { NavBar } from '../../components/home/NavBar'
import React from 'react';
import {LogoutForm} from '../../components/auth/signout';
import { Toaster } from '../../components/ui/toaster';
import  UserSideBar  from "../../components/home/userSideBar"  

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
     <div className="flex h-screen bg-[#0A2540]">
     <UserSideBar />
     <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar>
          <LogoutForm></LogoutForm>
          </NavBar>

          <main className="flex-1 p-4 md:overflow-y-auto md:p-4">
          {children}
          <Toaster />
        </main>
        </div>
        </div>
      </>
  );
}