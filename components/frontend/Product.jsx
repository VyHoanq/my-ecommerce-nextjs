"use client"
import { addToCart } from '@/redux/slices/cartSlice'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export default function Product({ product }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)

  function handleAddToCart() {
    // Kiểm tra sản phẩm trong giỏ hàng
    const existingItem = cartItems.find(item => item.id === product.id)
    const currentQty = existingItem ? existingItem.qty : 0

    // Kiểm tra nếu số lượng trong giỏ + 1 vượt quá productStock
    if (currentQty + 1 > product.productStock) {
      toast.error(`Only ${product.productStock} items available in stock`)
      return
    }

    // Nếu còn hàng thì thêm vào giỏ
    dispatch(addToCart(product))
    toast.success("Item added Successfully")
  }
  return (
    <div className="rounded-lg mr-3 bg-white overflow-hidden border shadow dark:bg-white">
      <Link href={`/products/${product.slug}`}>
        <Image
          width={556}
          height={556}
          className="w-full h-full object-cover "
          src={product.imageUrl}
          alt={product.title}
          priority={true}
        />
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-black my-2 text-center font-semibold">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3 text-black">
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
