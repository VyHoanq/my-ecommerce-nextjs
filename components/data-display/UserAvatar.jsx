"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import { LayoutDashboard, LogOut, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { generateInitials } from '@/lib/generateInitials';


export default function UserAvatar({ user = {}|| null }) {
  const { name ,image } = user;
  const initials=generateInitials(name)
  const role =user?.role
    const router =useRouter();
   async function handleLogout(){
        await signOut()
        router.push("/")
    }
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button>
        {image?<Image
          src="/tops.jpg"
          alt="User profile"
          width={300}
          height={300}
          className="w-8 h-8 rounded-full object-cover"
          priority={true}
        />:(
          <div className='w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center p-4 shadow-md border border-slate-600' >{initials}</div>
        )}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="py-2 px-4 pr-8 ">
      <DropdownMenuLabel>{name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/dashboard" className="flex items-center space-x-3">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/dashboard/profile" className="flex items-center space-x-3">
          <User2 className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </Link>
      </DropdownMenuItem>
      {role==="USER" && (
         <DropdownMenuItem>
         <Link href="/dashboard/orders" className="flex items-center space-x-3">
           <User2 className="mr-2 h-4 w-4" />
           <span>My Orders</span>
         </Link>
       </DropdownMenuItem>
      )}
      <DropdownMenuItem>
        <button onClick={handleLogout} className="flex items-center space-x-3">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
