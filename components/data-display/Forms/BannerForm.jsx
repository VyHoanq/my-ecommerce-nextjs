"use client";

import ImageInput from "@/components/forms/FormInput/Imageinput";
import TextInput from "@/components/forms/FormInput/Textinput";
import SubmitButton from "@/components/forms/SubmitButton";
import FormHeader from "@/components/forms/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ToggleInput from "@/components/forms/FormInput/Toggleinput";
import { Watch } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function BannerForm({updateData={}}) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  // const markets = [];
  const [loading, setLoading] = useState(false);
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
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/banners");
  }
  const isActive = watch("isActive");
  
  async function onSubmit(data) {
    setLoading(true);
    data.imageUrl = imageUrl;
    console.log(data);
    if(id){
      makePutRequest(
        setLoading,
        `api/banners/${id}`,
        data,
        "Banner",
        redirect
      );
    }else{
      makePostRequest(setLoading, "api/banners", data, "Banner", reset, redirect);
      setImageUrl("")
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          isRequired={true}
        />
        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
          isRequired={true}
        />

        <ImageInput
          label="Banner Image"
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          endpoint="bannerImageUploader"
        />
        <ToggleInput
          label="Publish your Banner "
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        }Creating Banner please wait.....`}
      />
    </form>
  );
}
