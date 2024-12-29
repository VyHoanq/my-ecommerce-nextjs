import OrderCard from "@/components/Order/OrderCard";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";

import { columns } from './columns';
import React from "react";
import { DataTable } from "../payments/data-table";

export default async function page() {
  const orders = await getData("orders");
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session?.user?.id;
  const userRole = session?.user?.role;

  if (orders.length === 0 || !orders) {
    return <p>No Orders Yet</p>;
  }

  const isAdminOrFarmer = userRole === "ADMIN" || userRole === "FARMER";
  const userOrders = isAdminOrFarmer
    ? orders
    : orders.filter((order) => order.userId === userId);

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {isAdminOrFarmer ? "All Orders" : "Your Orders"}
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              {isAdminOrFarmer
                ? "Manage all orders and customer activities."
                : "Check the status of recent and old orders & discover more products."}
            </p>
          </div>
          {isAdminOrFarmer ? (
            <DataTable data={orders} columns={columns} filterKeys={["name"]} />
          ) : (
            <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
              {userOrders.map((order, i) => (
                <OrderCard key={i} order={order} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
