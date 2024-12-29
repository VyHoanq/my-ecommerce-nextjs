import Link from 'next/link'
import React from 'react'

export default function EmptyCart() {
  return (
    <div className='flex items-center justify-center min-h-screen '>
      <p className='md:text-2xl'>YOUR CART IS EMPTY <Link className='text-purple-700' href="/" >Start Shopping</Link></p>
    </div>
  )
}
