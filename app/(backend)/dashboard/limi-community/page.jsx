import PageHeader from "@/components/backend/layout/PageHeader";
import TableActions from "@/components/backend/layout/TableActions";
import DataTable from "@/components/data-table-components/DataTable";
import { Search, Trash2, Download } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";


export default  async function  page() {
  const trainings = await getData("trainings");
  return (
    <div>
      <PageHeader
        title="Limi Community Trainings"
        href="/dashboard/limi-community/new"
        linkTitle="Add Training"
      />
    <div className="py-0 ">
        <DataTable data={trainings} columns={columns} />
      </div>
    </div>
  );
}
