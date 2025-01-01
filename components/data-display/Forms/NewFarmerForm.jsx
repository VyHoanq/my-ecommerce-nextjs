"use client";

import ImageInput from "@/components/forms/FormInput/Imageinput";
import SubmitButton from "@/components/forms/SubmitButton";
import TextareaInput from "@/components/forms/FormInput/Textareinput";
import TextInput from "@/components/forms/FormInput/Textinput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import ArrayItemInput from "@/components/forms/FormInput/ArrayItemInput";

export default function NewFarmerForm({ updateData = {}, userId }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(updateData?.profileImage || "");
  const [products, setProducts] = useState([]);
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
    }
  });
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/profile");
  }
  const isActive = watch("isActive")
  async function onSubmit(data) {
    const code = generateUserCode("LFF", data.name);
    data.code = code;
    data.userId = userId;
    data.products = products
    data.profileImageUrl = imageUrl;
    console.log(data);
    if (updateData?.id) {
      makePutRequest(
        setLoading,
        `api/farmers/${userId}/profile`,
        data,
        "Profile",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        `api/farmers/${userId}/profile`,
        data,
        "Profile",
        redirect
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Seller's Full Name"
          name="name"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Seller's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Seller's Email address"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Seller's Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Seller's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ArrayItemInput itemTitle="Product" setItems={setProducts} items={products} />
        <ImageInput
          label="Seller Profile Image"
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          endpoint="farmerProfileUploader"
        />
        <TextareaInput
          label="Seller's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={updateData?.id ? "Update Profile" : "Create Profile"}
        loadingButtonTitle={`${updateData?.id ? "Updating" : "Creating"} Profile...`}
      />

    </form>
  );
}