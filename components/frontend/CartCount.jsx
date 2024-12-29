"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartCount() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart);


  return (
    <div>
      <Link
        href="/cart"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg "
      >
        <ShoppingCart className="text-lime-700 dark:text-white" />
        <span className="sr-only">Cart</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-0 dark:border-gray-900">
          {cartItems.length}
        </div>
      </Link>
    </div>
  );
}
