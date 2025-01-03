import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SidebarCategories() {
  const categoriesData = await getData("categories");
  // ONLY categories with Products
  const categories = categoriesData.filter((category)=>category.products.length >0)
  console.log(categories)
  return (
    <div className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-lg dark:bg-white  dark:border-gray-700 text-black overflow-hidden hidden ">
      <h2 className="bg-slate-100 py-3 px-6 font-semibold border-b boder-gary-300 ">
        Shop by Category ({categories.length})
      </h2>
      <div className="py-3 px-6 h-[200px] overflow-y-auto flex flex-col gap-6">
        {categories.map((category, i) => {
          return (
            <Link
              key={i}
              href={`/category/${category.slug}`}
              className="flex items-center gap-3 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-50 dark:hover:text-black rounded-3xl duration-300 transition-all "
            >
              <Image
                width={556}
                height={556}
                className="w-12 h-12 rounded-full object-cover border border-purple-300 "
                src={category.imageUrl}
                alt={category.title}
                priority={true}
              />
              <span className="text-sm dark:text-black">{category.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
