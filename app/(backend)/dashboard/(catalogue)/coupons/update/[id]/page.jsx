import FormHeader from '@/components/forms/FormHeader'
import React from 'react'
import CouponForm from "@/components/data-display/Forms/CouponForm";
import { getData } from '@/lib/getData';


export default async function UpdateCoupon({params:{id}}) {
  const coupon = await getData(`coupons/${id}`)
  return (
    <div >
      <FormHeader title="Update Coupon"/>
      <CouponForm updateData={coupon}/>
    </div>
  )
  
} 
