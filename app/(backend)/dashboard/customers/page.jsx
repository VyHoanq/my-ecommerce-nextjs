import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function Customers() {
  const customers = await getData("customers");

  return (
    <div>
      <div className="py-8 ">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
}
