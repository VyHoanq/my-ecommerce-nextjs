
import StepForm from "@/components/Onboarding/StepForm";
import Steps from "@/components/Onboarding/Steps";
import React from "react";

export default function page({params:{id}}) {
  const steps = [
    {
      number: 1,
      title: "Basic Information",
    },
    {
      number: 2,
      title: "Additional Information",
    },
    {
      number: 3,
      title: " Summary",
    },
  ];
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto border border-purple-500 rounded-lg p-6">
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
       
          <StepForm farmerId={id}/>
        </div>
      </div>
    </div>
  );
}
