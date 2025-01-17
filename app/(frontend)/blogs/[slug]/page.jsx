import CategoryList from "@/components/frontend/CategoryList";
import RecentTrainings from "@/components/frontend/RecentTrainings";
import TrainingHtml from "@/components/TrainingHtml";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { getData } from "@/lib/getData";
import Image from "next/image";
import React from "react";

export default async function page({ params: { slug } }) {
  const training = await getData(`trainings/training/${slug}`)
  const trainingId = training.id
  const normalDate = convertIsoDateToNormal(training.createdAt)
  const allTrainings = await getData("trainings")
  const recentTrainings = allTrainings.filter((training) => training.id !== trainingId);
  const category = await getData(`categories/${training.categoryId}`)

  return (
    <>
      <section className="py-8 bg-white sm:py-16 lg:py-10 rounded-md">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
            <div className="bg-gray-100 lg:col-span-5 rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base font-medium text-gray-500">November 22, 2021</p>
                    <h1 className="mt-6 text-4xl font-bold text-gray-900 ">
                      {training.title}
                    </h1>
                  </div>
                  <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
                    <Image alt={training.title} src={training.imageUrl} width={1000} height={1000} className="object-cover w-full h-full" />
                  </div>
                  <div className="py-8 text-gray-900">
                    <p className="text-lg">{training.description}</p>
                    <hr className="mt-6" />
                    <div className="py-8">
                      <TrainingHtml content={training.content} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <RecentTrainings recentTrainings={recentTrainings} />
          </div>
        </div>
      </section>
      <div className="py-8">
        <CategoryList isMarketPage={false} category={category} />
      </div>
    </>
  );
}
