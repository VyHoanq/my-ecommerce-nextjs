import React from "react";

export default function Pricing() {
  const plans = [
    {
      title: "Free",
      isRecommended: false,
      description: "+5% transaction fee. It's good for starters. .........",
      price: "$0/mo",
      features: ["All features", "Unlimited products", "Unlimited revenue"],
    },
    {
      title: "Silver",
      isRecommended: true,
      description: "+2% transaction fee. It's good if your revenue is above $500.",
      price: "$20/mo",
      features: ["All features", "Unlimited products", "Unlimited revenue"],
    },
    {
      title: "Gold",
      isRecommended: false,
      description: "No transaction fee. It's good if you're earning more than $5000 in revenue.",
      price: "$99/mo",
      features: ["All features", "Unlimited products", "Unlimited revenue"],
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-4">Choose a plan that suits you!</h1>
      <p className="text-lg text-center max-w-2xl mb-10">
        Discover simplicity in pricing with us. Our straightforward and competitive rates ensure you get the best value. No hidden fees, just transparent options to meet your needs. Choose clarity, choose Limi Commerce.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col items-center relative ${
              plan.isRecommended ? "shadow-lg border-yellow-500" : ""
            }`}
          >
            {plan.isRecommended && (
              <div className="absolute -top-4 bg-yellow-500 text-gray-900 px-6 py-1 rounded-full text-xs font-bold uppercase">
                Recommended
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
            <p className="text-sm mb-4">{plan.description}</p>
            <div className="text-4xl font-bold text-purple-300 mb-6">
              {plan.price.split("/")[0]}
              <span className="text-sm text-gray-400">/{plan.price.split("/")[1]}</span>
            </div>
            <div className="w-full h-[2px] bg-gray-500 my-4"></div>
            <ul className="space-y-2 w-full">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="text-purple-500 mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition mt-6">
              {plan.isRecommended ? "Get started" : "Start for free"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
