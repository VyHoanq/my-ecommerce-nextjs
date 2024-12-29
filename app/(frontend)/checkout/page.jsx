import CartBanner from "@/components/Checkout/CartBanner";
import StepForm from "@/components/Checkout/StepForm";
import Steps from "@/components/Checkout/Steps";
import React from "react";

export default function page() {
  const steps = [
    {
      number: 1,
      title: "Personal Details",
    },
    {
      number: 2,
      title: "Shipping Details",
    },
    {
      number: 3,
      title: "Payment Method",
    },
    {
      number: 4,
      title: "Order Summary",
    },
  ];
  return (
    <div className="bg-slate-100 min-h-screen py-4">
      <div className="max-w-3xl my-6 mx-auto border border-purple-500 rounded-lg p-6">
        <Steps steps={steps} />
        <div className="w-full py-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <CartBanner />
          <StepForm />
        </div>
      </div>
    </div>
  );
}
