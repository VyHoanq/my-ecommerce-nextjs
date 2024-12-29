"use client";
import Link from "next/link";
import { useSearchParams  } from "next/navigation";
import React from "react";

export default function Sorting({ title, slug,isSearch }) {
  const searchParams =useSearchParams ();
  const sortParam =searchParams.get("sort")
 

  const sortingLinks=[
    {
      title:"Relavance",
      href:`/category/${slug}`,
      sort:null
    },
    {
      title:"Price-High to Low",
      href:`/category/${slug}?sort=desc`,
      sort:"desc"
    },
    {
      title:"Price-Low to High",
      href:`/category/${slug}?sort=asc`,
      sort:"asc"
    }
  ]

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-medium">{isSearch && "Search Result -"}{title}</h2>
      <div className="flex text-sm items-center gap-3">
        <p>Short By:</p>
        <div className="flex  items-center">
         {
          sortingLinks.map((link,i)=>{
            return (
              <Link key={i}
              className={`${link.sort ===sortParam?"border border-purple-400 bg-black px-2 py-1 text-purple-400":"border border-slate-500 px-2 py-1"}`}
              href={link.href}
            >
              {link.title}
            </Link>
            
            )
          })
         }
        </div>
      </div>
    </div>
  );
}
