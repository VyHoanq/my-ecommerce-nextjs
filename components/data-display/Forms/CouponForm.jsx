"use client";

import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/FormInput/Textinput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";
import ToggleInput from "@/components/forms/FormInput/Toggleinput";
import { generateIsoFormattedDate } from "@/lib/generateisoFormattedDate";
import { useRouter } from "next/navigation";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { useSession } from "next-auth/react";

export default function NewCoupon({ updateData = {} }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const router = useRouter();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  if (!session) {
    return <p>Loading...</p>;
  }

  const vendorId = session?.user?.id;
  const expiryDateNormal = convertIsoDateToNormal(updateData.expiryDate);
  const id = updateData?.id ?? "";
  updateData.expiryDate = expiryDateNormal;

  const isActive = watch("isActive");

  function redirect() {
    router.push("/dashboard/coupons");
  }

  async function onSubmit(data) {
    if (!vendorId) {
      console.error("No vendor ID found");
      return;
    }

    data.vendorId = vendorId;
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
    data.expiryDate = isoFormattedDate;
    data.couponCode = couponCode;

    try {
      if (id) {
        await makePutRequest(setLoading, `api/coupons/${id}`, data, "Coupon", redirect);
      } else {
        await makePostRequest(setLoading, "api/coupons", data, "Coupon", reset, redirect);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          register={register}
          type="date"
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Publish your Coupon "
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        }Creating Coupon please wait.....`}
      />
    </form>
  );
}
