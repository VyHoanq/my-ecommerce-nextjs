import { authOptions } from '@/lib/authOptions'
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth'
import React from 'react'
import Overviewcard from '../Farmer/Overviewcard'

export default async function FarmerDashboard() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  const {name ,email,id,role,emailVerified,} =user
  const sales= await getData("sales")
  const salesById = sales.filter((sale)=>sale.vendorId === id)
  const products = await getData("products")
  const productById=  products.filter((product)=>product.userId === id)
  return (
  <div>
      <div className='text-black max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
      <Overviewcard sales={salesById} products={productById}/>
    </div>
  </div>
  )
}
