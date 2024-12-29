"use client"
import React from 'react'
import BasicInformationForm from './StepForms/BasicInformationForm'
import FarmDetailsForm from './StepForms/FarmDetailsForm'
import AdditionalInformationForm from './StepForms/AdditionalInformationForm'
import SummaryForm from './StepForms/SummaryForm'
import { useSelector } from 'react-redux'

export default function StepForm({farmerId}) {
    const currentStep = useSelector((store)=>store.onboarding.currentStep)
    console.log(currentStep)
    function renderFormByStep(step){
        if(step===1){
            return <BasicInformationForm/>
        }else if(step===2){
            return <FarmDetailsForm/>
        }else if(step===3){
            return <AdditionalInformationForm/>
        }else if(step===4){
            return <SummaryForm farmerId={farmerId}/>
        }
    }
  return (
    <div>
      {renderFormByStep(currentStep)}
    </div>
  )
}
