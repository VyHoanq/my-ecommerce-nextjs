"use client";


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateOnboardingFormData } from "@/redux/slices/onboardingSlice";
import ImageInput from "@/components/forms/FormInput/Imageinput";
import TextareaInput from "@/components/forms/FormInput/Textareinput";

export default function AdditionalInformationForm() {

  const [imageUrl, setImageUrl] = useState()
  const dispatch = useDispatch()
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector((store) => store.onboarding.onboardingFormData);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData
    }
  });

  async function processData(data) {

    data.profileImageUrl = imageUrl;
    dispatch(updateOnboardingFormData(data))
    dispatch(setCurrentStep(currentStep + 1))
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 text-purple-600">
        Additional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
          label="Seller Profile Image"
        />
        <TextareaInput
          label="Seller's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <NavButtons />
    </form>
  );
}
