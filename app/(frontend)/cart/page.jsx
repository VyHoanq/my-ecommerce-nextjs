'use client'

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);

  const subTotal = cartItems
    .reduce((acc, currentItem) => acc + currentItem.salePrice * currentItem.qty, 0)
    .toFixed(0) ?? 0;
  const [discount, setDiscount] = useState(0);

  const applyCoupon = async (couponCode) => {
    try {
      const res = await fetch("/api/coupons", {
        method: "PATCH",
        body: JSON.stringify({ couponCode }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setDiscount(data.discountValue);
      } else {
        alert(data.message || "Failed to apply coupon");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while applying the coupon.");
    }
  };

  return (
    <div>
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-14">
          <div className="md:col-span-8 lg:col-span-8">
            <CartItems cartItems={cartItems} applyCoupon={applyCoupon} />
          </div>
          <div className="md:col-span-4 lg:col-span-4">
            <CartSubTotalCard subTotal={subTotal} discount={discount} />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
