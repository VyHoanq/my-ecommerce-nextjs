
import * as React from "react"
import PriceFilter from "./PriceFilter"
import BrandFilter from "./BrandFilter"


export default function Filters({slug}) {
  // const [isOpen, setIsOpen] = React.useState(false)
  return (
   <div className="">
    <PriceFilter slug={slug}/>
    {/* <BrandFilter/> */}
   </div>
  )
}
