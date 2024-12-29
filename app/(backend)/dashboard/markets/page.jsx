import PageHeader from '@/components/backend/layout/PageHeader'
import TableActions from '@/components/backend/layout/TableActions'


import React from 'react'
import { columns } from './columns';
import { getData } from '@/lib/getData';
import DataTable from '@/components/data-table-components/DataTable';


export default async function page() {
  const markets = await getData("markets");
  return (
    <div>
      <PageHeader title="Markets" 
      linkTitle="Add Market" 
      href="/dashboard/markets/new" />
      {/*id, title, link, image */}
      <div className="py-0 ">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  )
}