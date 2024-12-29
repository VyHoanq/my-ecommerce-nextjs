"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import TextInput from "../forms/FormInput/Textinput";
import SubmitButton from "../forms/SubmitButton";
import ImageInput from "../forms/FormInput/Imageinput";

export default function NewCustomerForm({ user }) {
  const [profileImageUrl, setProfileImageUrl] = useState(
    user?.profile?.[0]?.profileImage || ""
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      firstName: user?.profile?.[0]?.name,
      lastName: user?.profile?.[0]?.lastName,
      dateOfBirth: user?.profile?.[0]?.dateOfBirth
        ? new Date(user.profile[0].dateOfBirth).toISOString().split("T")[0]
        : undefined,
    },
  });

  const router = useRouter();
  const isActive = watch("isActive");
  function redirect() {
    router.push("/dashboard/customers");
  }

  async function onSubmit(data) {
    const formData = {
      ...data,
      profileImageUrl: profileImageUrl,
    };

    try {
      await makePutRequest(
        setLoading,
        `api/customers/${user.id}`,
        formData,
        "Customer Profile",
        () => router.push("/dashboard/customers")
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-4 max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <input type="hidden" {...register("id")} />

      <h2 className="text-xl font-semibold mb-4 dark:text-slate-200">
        Personal Details
      </h2>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <TextInput
          label="Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Date Of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Email Address"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ImageInput
          imageUrl={profileImageUrl}
          setImageUrl={setProfileImageUrl}
          endpoint="customerProfileUploader"
          label="Customer Profile Image"
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle="Update Customer"
        loadingButtonTitle="Updating customer, please wait ..."
      />
    </form>
  );
}
