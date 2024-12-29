"use client";
import FormHeader from "@/components/forms/FormHeader";
import ImageInput from "@/components/forms/FormInput/Imageinput";
import SubmitButton from "@/components/forms/SubmitButton";
import TextareaInput from "@/components/forms/FormInput/Textareinput";
import TextInput from "@/components/forms/FormInput/Textinput";
import { generateSlug } from "@/lib/generateSlug";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "@/components/forms/FormInput/Selectinput";
import ToggleInput from "@/components/forms/FormInput/Toggleinput";
import "react-quill-new/dist/quill.snow.css";

import QuillEditor from "@/components/forms/FormInput/QuillEditor";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";

export default function NewTrainingForm({categories,updateData={}}) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialContent = updateData?.content?? [];
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
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
      ...updateData
    },
  });

  const [content, setContent] = useState(initialContent)
 const router=useRouter()
 function redirect(){
    router.push("/dashboard/limi-community")
 }
  const isActive = watch("isActive");
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.content=content;
    data.imageUrl = imageUrl;
    console.log(data);
    if (id){
      data.id = id;
      makePutRequest(
        setLoading,
        `api/trainings/${id}`,
        data,
        "Training",
        redirect
      )
      }else{
        makePostRequest(
          setLoading,
          "api/trainings",
          data,
          "Training",
          reset,
          redirect
        );
        setImageUrl("");
        setContent([]);
      }
    }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
  >
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <TextInput
        label="Training Title"
        name="title"
        register={register}
        errors={errors}
        className="w-full"
      />
      <SelectInput
        label="Select Category"
        name="categoryId"
        register={register}
        errors={errors}
        className="w-full"
        options={categories}
      />
      <TextareaInput
        label="Training Description"
        name="description"
        register={register}
        errors={errors}
      />
      <ImageInput
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        endpoint="trainingImageUploader"
        label="Training Thumbnail"
      />
      <QuillEditor
        label="Training Content"
        value={content}
        onChange={setContent}
      />
      <ToggleInput
        label="Publish your Training"
        name="isActive"
        trueTitle="Active"
        falseTitle="Draft"
        register={register}
      />
    </div>
    <SubmitButton
      isLoading={loading}
      buttonTitle={id ? "Update Training" : "Create Training"}
      loadingButtonTitle={`${
        id ? "Updating" : "Creating"
      }Product Training please wait.....`}
    
    />
  </form>
  );
}
