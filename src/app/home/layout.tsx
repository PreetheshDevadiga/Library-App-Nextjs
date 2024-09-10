import { NavBar } from '../../components/home/NavBar'
import React from 'react';
import {LogoutForm} from '../../components/auth/signout';

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
        <NavBar>
          <LogoutForm></LogoutForm>
          </NavBar>

      <div className="flex-grow p-4 md:overflow-y-auto md:p-12">{children}</div>
      </>
  );
}