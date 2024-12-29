import React from "react";
import MarketCarousel from "./MarketCarousel";
import { getData } from "@/lib/getData";

export default async function MartketList() {
  const markets = await getData('markets')

  return (
    <div className="dark:text-white text-black py-10">
      {/* Market Slider */}
      <div className="bg-purple-100 rounded-lg p-4 mt-5">
        <h2 className="py-2 text-center text-2xl font-bold mb-4">BRAND</h2>
        <MarketCarousel markets={markets} />
      </div>
    </div>
  );
}
