
import BannerForm from '@/components/data-display/Forms/BannerForm'
import FormHeader from '@/components/forms/FormHeader'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateBanner({params:{id}}) {
  const banner = await getData(`banners/${id}`)
  return (
    <div>
    <FormHeader title="Update banner" />
    <BannerForm updateData={banner}/>
  </div>
  )
}

