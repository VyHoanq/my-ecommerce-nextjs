import React, { useState } from "react";
import Link from "next/link";

export default function CartSubTotalCard({ subTotal }) {
  const shipping = 3;
  const tax = 0;
  const [discount, setDiscount] = useState(0);
  const totalPrice = Number(subTotal) + Number(shipping) + Number(tax) - discount;
  const applyCoupon = async (couponCode) => {
    try {
      const response = await fetch("/api/coupons", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setDiscount(data.discountValue);
        alert("Coupon applied successfully!");
      } else {
        alert(data.message || "Failed to apply coupon");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="md:col-span-4 col-span-full sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 text-slate-800 overflow-hidden p-5 dark:text-slate-100 font-bold flex flex-col justify-between">
      <h2 className="text-2xl pb-3">Cart Total</h2>
      <div className="flex items-center justify-between border-b pb-6 border-slate-500">
        <span>Subtotal </span>
        <span>${subTotal}</span>
      </div>
      <div className="flex items-center justify-between pb-4 mt-2">
        <span>Tax </span>
        <span>${tax}</span>
      </div>
      <div className="flex items-center justify-between pb-4">
        <span>Shipping </span>
        <span>${shipping}</span>
      </div>
      {discount > 0 && (
        <div className="flex items-center justify-between pb-4 text-green-500">
          <span>Coupon Discount </span>
          <span>-${discount}</span>
        </div>
      )}
      <div className="flex items-center justify-between pb-4 font-bold">
        <span>Total </span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter Coupon"
          className="flex-1 p-2 border rounded"
          id="coupon-input"
        />
        <button
          onClick={() => {
            const couponCode = document.getElementById("coupon-input").value;
            applyCoupon(couponCode);
          }}
          className="py-2 px-4 bg-purple-400 text-white rounded"
        >
          Apply
        </button>
      </div>

      <div className="mt-8">
        <Link
          href="/checkout"
          className="bg-purple-400 hover:bg-purple-800 hover:text-white text-slate-900 rounded py-3 px-6 font-bold"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
}
