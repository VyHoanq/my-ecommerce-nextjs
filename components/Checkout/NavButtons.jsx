import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavButtons() {
    const currentStep = useSelector((store)=>store.checkout.currentStep)
    const dispatch =useDispatch()
    function handlePrevious(){
        dispatch(setCurrentStep(currentStep-1))
    }
  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 && (
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
      )}
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 test-sm font-medium text-center
                    text-white bg-purple-900 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-purple-800"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}
