import PageHeader from '@/components/backend/layout/PageHeader'
import TableActions from '@/components/backend/layout/TableActions'
import DataTable from '@/components/data-table-components/DataTable'
import { getData } from '@/lib/getData'
import { Search, Trash2 , Download } from 'lucide-react'
import React from 'react'
import { columns } from './columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'



export default async function Sales() {
  const session = await getServerSession(authOptions)
  const id=session?.user?.id
  const role=session?.user?.role
  const allSales = await getData("sales");
  const farmerSales = allSales.filter((sale)=>sale.vendorId===id)
  return (
    <div>
      {/* <PageHeader
       title="Coupons" 
       href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
        /> */}
          <div className="py-8 ">
        {role==="ADMIN"?(<DataTable data={allSales} columns={columns} />):(<DataTable data={farmerSales} columns={columns} />)}
      </div>
    </div>
  )
}

