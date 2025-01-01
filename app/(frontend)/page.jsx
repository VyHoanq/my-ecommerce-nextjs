import CategoryList from "@/components/frontend/CategoryList";
import Chatbot from "@/components/frontend/Chatbot";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MartketList from "@/components/frontend/MartketList";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import Link from "next/link";

import React from "react";

export default async function Home() {
  const categoriesData = await getData('categories');
  const categories = categoriesData.filter((category) => {
    return category.products.length > 3
  })
  const trainings = await getData('trainings')
  const session = await getServerSession(authOptions)
  return (
    <div className=" min-h-screen">
      <Hero />
      <MartketList />
      {categories.map((category, i) => {
        return (
          <div className="py-8" key={i} >
            <CategoryList isMarketPage={false} category={category} /></div>
        )
      })}
      <CommunityTrainings title="Featured Trainings" trainings={trainings.slice(0, 3)} />
      <Chatbot />
    </div>
  );
}