import { NavBar } from '../../components/home/NavBar'
import React from 'react';
import {LogoutForm} from '../../components/auth/signout';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
        <NavBar>
          <LogoutForm></LogoutForm>
          </NavBar>

      <div className="flex-grow p-4 md:overflow-y-auto md:p-12">{children}<Toaster></Toaster></div>
      </>
  );
}