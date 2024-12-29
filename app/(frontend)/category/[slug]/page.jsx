import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const { sort, min, max } = searchParams;
  const category = await getData(`categories/filter/${slug}`);
  let products;
  if (max && min) {
    products = await getData(
      `products?catId=${category.id}&sort=asc&min=${min}&max=${max}`
    );
  } else if (min) {
    products = await getData(
      `products?catId=${category.id}&sort=asc&min=${min}`
    );
  } else if (max) {
    products = await getData(
      `products?catId=${category.id}&sort=asc&max=${max}`
    );
  } else if (sort) {
    products = await getData(`products?catId=${category.id}&sort=${sort}`);
  } else {
    products = await getData(`products?catId=${category.id}`);
  }

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}
