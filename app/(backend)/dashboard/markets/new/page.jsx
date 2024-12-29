import NewMarketForm from "@/components/data-display/NewMarketForm";
import FormHeader from "@/components/forms/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewMarket() {
  const categoriesData= await getData('categories')
 
  const categories = categoriesData.map((category)=>{
    return{
      id: category.id,
      title:category.title
    }
  })

  return (
    <div>
      <FormHeader title="New Market"/>
      <NewMarketForm categories={categories} />;
    </div>
  )
}
