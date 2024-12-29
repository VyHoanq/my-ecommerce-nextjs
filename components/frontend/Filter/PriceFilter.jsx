import Link from "next/link";
import React from "react";

export default function PriceFilter({ slug }) {
  const priceRanges = [
    {
      display: "Under 30",
      max: 30,
    },
    {
      display: "Between 30 and 50",
      min: 30,
      max: 50,
    },
    {
      display: "Between 50 and 70",
      min: 50,
      max: 70,
    },
    {
      display: "Above 70",
      min: 70,
    },
  ];

  return (
    <div className="p-4 bg-black text-purple-300 rounded-md w-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Price</h2>
        <Link
          href={`/category/${slug}?sort=asc`}
          className="bg-white text-black px-3 py-1 rounded-md text-sm hover:bg-purple-300"
        >
          Reset Filters
        </Link>
      </div>

      {/* Price Ranges */}
      <div className="flex flex-col gap-3">
        {priceRanges.map((range, i) => (
          <Link
            key={i}
            href={
              range.max && range.min
                ? `/category/${slug}?sort=asc&max=${range.max}&min=${range.min}`
                : range.max
                ? `/category/${slug}?sort=asc&max=${range.max}`
                : `/category/${slug}?sort=asc&min=${range.min}`
            }
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="price"
              className="text-white"
              readOnly
            />
            {range.display}
          </Link>
        ))}
      </div>

      {/* Custom Range Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          placeholder="min"
          className="w-full px-3 py-1 rounded-md bg-white text-black focus:outline-none"
        />
        <input
          type="number"
          placeholder="max"
          className="w-full px-3 py-1 rounded-md bg-white text-black focus:outline-none"
        />
        <button className="bg-white text-black px-4 py-1 rounded-md hover:bg-purple-300">
          Go
        </button>
      </div>
    </div>
  );
}
