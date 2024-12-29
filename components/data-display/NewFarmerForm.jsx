"use client";

import ImageInput from "@/components/forms/FormInput/Imageinput";
import SubmitButton from "@/components/forms/SubmitButton";
import TextareaInput from "@/components/forms/FormInput/Textareinput";
import TextInput from "@/components/forms/FormInput/Textinput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import ToggleInput from "@/components/forms/FormInput/Toggleinput";
import { useRouter } from "next/navigation";
import ArrayItemInput from "../forms/FormInput/ArrayItemInput";

export default function NewFarmerForm({user}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [couponCode, setCouponCode] = useState();
  const [products,setProducts] =useState([]);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      isActive:true,
      ...user
    }
  });
  const router = useRouter();
  function redirect() {
    router.push("/login");
  }
  const isActive=watch("isActive")
  async function onSubmit(data) {
    const code = generateUserCode("LFF", data.name);
    data.code = code;
    data.userId=user.id;
    data.products=products
    data.profileImageUrl=imageUrl;
    console.log(data);
    makePostRequest(setLoading, "api/farmers", data, "Farmer Profile", reset,redirect);
  }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
  >
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <TextInput
        label="Farmer's Full Name"
        name="name"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="Farmer's Phone"
        name="phone"
        type="tel"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="Farmer's Email address"
        name="email"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="Farmer's Physical Address"
        name="physicalAddress"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="Farmer's Contact Person"
        name="contactPerson"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="Farmer's Contact Person Phone"
        name="contactPersonPhone"
        type="tel"
        register={register}
        errors={errors}
        className="w-full"
      />
      <TextInput
        label="What is the Size of Your Land in Accres"
        name="landSize"
        type="number"
        register={register}
        errors={errors}
        className="w-full"
      />
       <TextInput
        label="What is your main Crop that you Cultivate"
        name="mainCrop"
        type="text"
        register={register}
        errors={errors}
        className="w-full"
      />
       <ArrayItemInput itemTitle="Product" setItems={setProducts} items={products}  />
       <ImageInput
        label="Farmer Profile Image"
        setImageUrl={setImageUrl}
        imageUrl={imageUrl}
        endpoint="farmerProfileUploader"
      />
      <TextareaInput
        label="Farmer's Payment Terms"
        name="terms"
        register={register}
        errors={errors}
        isRequired={false}
      />
      <TextareaInput
        label="Notes"
        name="notes"
        register={register}
        errors={errors}
        isRequired={false}
      />
      <ToggleInput
        label="Farmer Status "
        name="isActive"
        trueTitle="Active"
        falseTitle="Draft"
        register={register}
      />
    </div>
    <SubmitButton
      isLoading={loading}
      buttonTitle="Create Farmer"
      loadingButtonTitle="Creating Farmer please wait....."
    />
  </form>
  );
}