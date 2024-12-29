import React from 'react'
import Heading from './Heading'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function PageHeader({title,linkTitle, href}) {
  return (
   
    <div className="flex justify-between py-4 mb-4">
      <Heading title={title}/>
      <Link className='text-white bg-purple-400 hover:bg-purple-400/90 focus:ring-4 focus:outline-none focus:ring-purple-400/50 font-medium rounded-lg text-base px-5 py-3 text-center inline-flex items-center dark:focus:ring-purple-400/55 me-2 space-x-3 ' href={href}><Plus/>
        <span>{linkTitle}</span>
      </Link>
    </div>
    
    
  )
}
