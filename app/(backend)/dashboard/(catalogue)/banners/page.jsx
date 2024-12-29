
import PageHeader from "@/components/backend/layout/PageHeader";
import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import DataTable from "@/components/data-table-components/DataTable";

export default async function Page() {
  const banners = await getData("banners");

  return (
    <div>
      <PageHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
      />
      <div className="py-0 ">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}