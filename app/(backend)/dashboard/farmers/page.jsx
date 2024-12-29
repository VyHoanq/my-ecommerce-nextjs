import PageHeader from '@/components/backend/layout/PageHeader'
import TableActions from '@/components/backend/layout/TableActions'
import { getData } from '@/lib/getData';
import { Search, Trash2 , Download } from 'lucide-react'
import React from 'react'

import { columns } from './columns';
import DataTable from '@/components/data-table-components/DataTable';


export default  async function Farmers() {
  const farmers = await getData("farmers");
  return (
    <div>
      <PageHeader
       title="Seller" 
       href="/dashboard/farmers/new"
        linkTitle="Add Seller"
        />
        <div className="py-0 ">
        <DataTable data={farmers} columns={columns}  filterKeys={["name"]}/>
      </div>
    </div>
  )
}

