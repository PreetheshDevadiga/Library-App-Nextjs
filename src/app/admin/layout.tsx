import { AdminNavBar } from "../../components/admin/books/AdminNavBar";
import React from "react";
import { LogoutForm } from "../../components/auth/signout";
import { Toaster } from "../../components/ui/toaster";
import SideBar from "../../components/admin/books/adminSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminNavBar>
            <LogoutForm></LogoutForm>
          </AdminNavBar>
        <main className="flex-1 p-4 md:overflow-y-auto md:p-4">
          {children}
          <Toaster />
        </main>
        </div>

      </div>
    </>
  );
}
