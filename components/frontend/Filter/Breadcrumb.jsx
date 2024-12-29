"use client"
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb({title,resultCount}) {
  return (
    <div className="flex items-center justify-between text-xs">
    <div className="flex items-center">
      <Link href="/">Home</Link>
      <ChevronRight className="w-5 h-5"/>
      <p>{title}</p>
    </div>
    <p>1-40 of {resultCount} results</p>
  </div>
  );
}