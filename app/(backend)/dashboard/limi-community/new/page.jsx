import NewTrainingForm from "@/components/data-display/NewTrainingForm";
import FormHeader from "@/components/forms/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewTraining() {
  const categoriesData= await getData('categories')
 
  const categories = categoriesData.map((category)=>{
    return{
      id: category.id,
      title:category.title
    }
  })
  return (
    <div>
      <FormHeader title="New Training"/>
      <NewTrainingForm categories={categories} />;
    </div>
  )
}
