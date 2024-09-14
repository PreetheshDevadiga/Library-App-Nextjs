
import { Button } from "../ui/button";
import {
  Library,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
  HistoryIcon,
} from "lucide-react";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarCollapsed,
  toggleSidebar,
}: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={`bg-white ${
        isSidebarCollapsed ? "w-20" : "w-35"
      } h-full transition-all duration-300 ease-in-out flex flex-col items-start `}
    >
      <div className="flex items-center justify-between p-4 ">
        {!isSidebarCollapsed && (
          <>
            <BookOpen className="h-8 w-8 text-primary pr-2" />{" "}
            <h1 className="text-2xl font-bold text-primary">BookShelf</h1>
          </>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarCollapsed ? (
            <>
              <BookOpen className="mx-auto h-8 w-8 text-primary" />{" "}
              <ChevronRight className="h-8 w-8" />{" "}
            </>
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="mt-4">
        <div className="flex flex-row gap-1 p-4 items-center ">
          <Link
            className={clsx("text-black hover:text-blue-600", {
              "text-blue-600 ": pathname === "/admin",
            })}
            href="/admin"
          >
            <Library
              className={`h-5 w-5 ${isSidebarCollapsed ? "mx-auto" : "mr-2"}`}
            />
          </Link>

          {!isSidebarCollapsed && (
            <Link
              className={clsx("text-black hover:text-blue-600", {
                "text-blue-600 ": pathname === "/admin",
              })}
              href="/admin"
            >
              All Books
            </Link>
          )}
        </div>

        <div className="flex flex-row gap-1 p-4 items-center">
          <Link
            className={clsx("text-black hover:text-blue-600", {
              "text-blue-600": pathname === "/admin/members",
            })}
            href="/admin/members"
          >
            <User
              className={`h-5 w-5 ${isSidebarCollapsed ? "mx-auto" : "mr-2"}`}
            />
          </Link>

          {!isSidebarCollapsed && (
            <Link
              className={clsx("text-black hover:text-blue-600", {
                "text-blue-600": pathname === "/admin/members",
              })}
              href="/admin/members"
            >
              All Members
            </Link>
          )}
        </div>

        <div className="flex flex-row gap-1 p-4 items-center">
          <Link
            className={clsx("text-black hover:text-blue-600", {
              "text-blue-600": pathname === "/admin/transaction",
            })}
            href="/admin/transaction"
          >
            <HistoryIcon
              className={`h-5 w-5 ${isSidebarCollapsed ? "mx-auto" : "mr-2"}`}
            />
          </Link>

          {!isSidebarCollapsed && (
            <Link
              className={clsx("text-black hover:text-blue-600", {
                "text-blue-600": pathname === "/admin/transaction",
              })}
              href="/admin/transaction"
            >
              All Transaction
            </Link>
          )}
        </div>

      </nav>
    </aside>
  );
}

function SidebarButton({
  icon,
  label,
  isActive,
  onClick,
  isSidebarCollapsed,
}: any) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start ${
        isSidebarCollapsed ? "px-0" : "px-4"
      } mb-2`}
      onClick={onClick}
    >
      {icon}
      {!isSidebarCollapsed && <span>{label}</span>}
    </Button>
  );
}
