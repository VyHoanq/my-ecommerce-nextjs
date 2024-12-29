import NewTrainingForm from "@/components/data-display/NewTrainingForm";
import FormHeader from "@/components/forms/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateTraining({params:{id}}) {
  const training = await getData(`trainings/${id}`)
  const categoriesData= await getData('categories')
 
  const categories = categoriesData.map((category)=>{
    return{
      id: category.id,
      title:category.title
    }
  })
  return (
    <div>
      <FormHeader title="Update Training"/>
      <NewTrainingForm categories={categories} updateData={training} />;
    </div>
  )
}
