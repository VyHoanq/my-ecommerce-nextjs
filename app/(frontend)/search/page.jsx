import FilterComponent from '@/components/frontend/Filter/FilterComponent'
import { getData } from '@/lib/getData';
import React from 'react'

export default async function Search({searchParams}) {
  const {search,sort,min,max} = searchParams
 
    let products;
    if(search){
      products= await getData(`products?search=${search}`)
    }
    else{
      products= await getData(`products?search=`)
    }
    const category = {
      title:search,
      slug:"",
      products,
      isSearch:true
    }
   
    return (
      <div>
        
        <FilterComponent  category={category} products={products}/>
      </div>
    )
}
