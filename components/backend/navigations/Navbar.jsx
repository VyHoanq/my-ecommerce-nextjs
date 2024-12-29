"use client"
import {
  AlignJustify,
  AlignJustifyIcon,
  Bell,
  LayoutDashboard,
  LogOut,
  Sun,
  User2,
  X,
} from "lucide-react";
import React from "react";
import Img from "@/public/c.jpg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/data-display/UserAvatar";
import { useSession } from "next-auth/react";

export default function Navbar({ setShowSidebar, showSidebar }) {
const {data:session,status}=useSession()

if (status==="loading"){
  return <p>Loading...</p>
}

  return (
    <div className="flex items-center justify-between bg-slate-50 dark:bg-neutral-900 text-slate-50 h-20 px-8 py-8 fixed top-0 w-full z-50 sm:pr-[20rem]">
      {/* Icon */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="dark:text-white text-black"
      >
        <AlignJustifyIcon />
      </button>
      {/* 3 Icons */}
      <div className="flex space-x-3 relative">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg">
              <Bell className="dark:text-white text-black" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-white rounded-full -top-0 -end-0 dark:border-gray-900">
                9+
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center space-x-3">
                <Image
                  src={Img}
                  alt="User profile"
                  width={300}
                  height={300}
                  className="w-8 h-8 rounded-full object-cover"
                  priority={true}
                />
                <div>
                  <p className="flex flex-col space-y-1">
                    New comment on your post
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700 rounded-full text-white text-sm">
                      Stock Out
                    </p>
                    <p className="text-xs">Sep 15 2024 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        {status==="authenticated" && <UserAvatar user={session?.user}/>}
        {/* <UserAvatar user={session?.user}/> */}
      </div>
    </div>
  );
}
