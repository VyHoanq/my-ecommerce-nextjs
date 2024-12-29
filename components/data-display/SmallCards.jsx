import React from "react";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader, RefreshCcw, ShoppingCart } from "lucide-react";

export default function SmallCards({orders}) {
  const status={
    pending:"PENDING",
    processing:"PROCESSING",
    shipping:"SHIPPED",
    deliverying:"DELIVERED",
    cancelling:"CANCELED"
  };


  function getOrdersCountByStatus(status){
  const fillteredOrders= orders.filter((order)=>order.orderStatus === status)
 const count =fillteredOrders.length.toString().padStart(2,"0")
 return count
 };

  const ordersCount = orders.length.toString().padStart(2,"0") 
  const pendingOrdersCount= getOrdersCountByStatus(status.pending)
  const processingOrdersCount= getOrdersCountByStatus(status.processing)
  const deliveredOrdersCount= getOrdersCountByStatus(status.deliverying)
  const orderStatus = [
    {
      title: "Total Orders",
      number: ordersCount,
      iconBg: "bg-stone-500",
      icon: ShoppingCart,
    },
    {
      title: "Orders Pending",
      number: pendingOrdersCount,
      iconBg: "bg-violet-400",
      icon: Loader,
    },
    {
      title: "Orders Processing",
      number: processingOrdersCount,
      iconBg: "bg-indigo-800",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      number: deliveredOrdersCount,
      iconBg: "bg-teal-800",
      icon: CheckCheck,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStatus.map((data, i) => {
        return <SmallCard key={i} data={data} />;
      })}
    </div>
  );
}
