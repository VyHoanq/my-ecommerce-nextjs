'use client'
import React from "react";
import SearchForm from "./SearchForm";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo1.png";
import { User } from "lucide-react";
import HelpModal from "./HelpModal";
import CartCount from "./CartCount";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import UserAvatar from "../data-display/UserAvatar";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />; // Tạo một loading component đẹp mắt hơn
  }

  return (
    <div className="bg-white dark:bg-white">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto px-4 sm:px-8 sm:gap-2 gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logo}
            alt="limifood logo"
            className="w-24"
            priority={true}
          />
        </Link>

        {/* Search */}
        <div className="flex-grow max-w-[500px]">
          <SearchForm />
        </div>

        {/* User / Cart / Help Modal */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* If user is not authenticated */}
          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
            >
              <User />
              <span>Login</span>
            </Link>
          ) : (
            <UserAvatar user={session?.user} />
          )}
          {/* Help Modal */}
          <HelpModal />
          {/* Cart Count */}
          <CartCount />
        </div>
      </div>
    </div>
  );
}
