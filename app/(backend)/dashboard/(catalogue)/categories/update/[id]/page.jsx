import NewCategoryForm from '@/components/data-display/Forms/NewCategoryForm'
import FormHeader from '@/components/forms/FormHeader'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateCategory({params:{id}}) {
  const category = await getData(`categories/${id}`)
  return (
    <div>
    <FormHeader title="Update category" />
    <NewCategoryForm updateData={category}/>
  </div>
  )
}
