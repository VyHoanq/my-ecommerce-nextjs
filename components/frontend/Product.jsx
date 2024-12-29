"use client"
import { addToCart } from '@/redux/slices/cartSlice'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Product({ product }) {
  const dispatch = useDispatch()
  function handleAddToCart() {
    // ADD TO CART
    dispatch(addToCart(product));
    toast.success("Item added Successfully")
  }
  return (
    <div className="rounded-lg mr-3 bg-white overflow-hidden border shadow dark:bg-black">
      <Link href={`/products/${product.slug}`}>
        <Image
          width={556}
          height={556}
          className="w-full h-36 object-cover "
          src={product.imageUrl}
          alt={product.title}
          priority={true}
        />
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="dark:text-white text-black my-2 text-center font-semibold">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
          <p> $ {product.salePrice}</p>
          <button onClick={() => handleAddToCart()} className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-md text-white">
            <ShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
