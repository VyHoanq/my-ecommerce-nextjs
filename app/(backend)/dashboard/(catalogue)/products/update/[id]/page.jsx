import NewProductForm from "@/components/data-display/NewProductForm";
import FormHeader from "@/components/forms/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateProduct({params:{id}}) {
  const product = await getData(`products/${id}`)
  const categoriesData = await getData("categories");
  const usersData = await getData("users");
  const farmerData = usersData.filter((user) => user.role === "FARMER");
  const farmers = farmerData.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  return (
    <div>
      <FormHeader title="Update Product"/>
      <NewProductForm  updateData={product} categories={categories} farmers={farmers} />;
    </div>
  )
  
}
