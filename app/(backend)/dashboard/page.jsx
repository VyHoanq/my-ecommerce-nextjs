import Heading from "@/components/backend/layout/Heading";
import CustomDataTable from "@/components/data-display/CustomDataTable";
import DashboardCharts from "@/components/data-display/DashboardCharts";
import LargeCards from "@/components/data-display/LargeCards";
import FarmerDashboard from "@/components/data-display/pageDashboard/FarmerDashboard";
import UserDashboard from "@/components/data-display/pageDashboard/UserDashboard";
import SmallCards from "@/components/data-display/SmallCards";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions)
  const role =session?.user?.role
   const sales= await getData("sales")
   const orders = await getData("orders")
    const products = await getData("products")
  if(role==="USER"){
    return <UserDashboard/>
  }
  if(role==="FARMER"){
    return <FarmerDashboard/>
  }
  return (
    <div>
      <Heading title="Dashboard Overview" />
      <LargeCards sales={sales} />
      <SmallCards orders={orders} />
      <DashboardCharts />
      {/* <CustomDataTable /> */}
    </div>
  );
}
