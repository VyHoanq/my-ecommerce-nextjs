"use client";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { setCurrentStep } from "@/redux/slices/onboardingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function SummaryForm(farmerId) {
  const { reset } = useForm(); // Destructure reset from useForm
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const onboardingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  function redirect() {
    router.push("/login");
  }

  async function submitData() {
    const data = {...onboardingFormData}
    const fullName=`${data.firstName} ${data.lastName}`
     const code = generateUserCode("LFF", fullName);
       data.code = code;
       data.userId=farmerId;
       console.log(data);
       makePostRequest(setLoading, "api/farmers", data, "Farmer Profile", reset,redirect);
     }
   
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-purple-600">
        Order Summary
      </h2>
      <div className="flex">
        <h2>Here are your Details</h2>
      </div>
    
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 test-sm font-medium text-center
                    text-white bg-purple-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-purple-800
                    "
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
       {
        loading?(
            <button disabled className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 test-sm font-medium text-center
                      text-white bg-purple-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-purple-800">Processing Please wait....</button>
        ):(
            <button
            onClick={submitData}
            type="submit"
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 test-sm font-medium text-center
                      text-white bg-purple-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-purple-800"
          >
            <span>Submit Data</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )
       }
      </div>
    </div>
  );
}