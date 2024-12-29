"use client"
import { addToCart } from '@/redux/slices/cartSlice';
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function AddtocartButton({product}) {
    const dispatch =useDispatch()
    function handleAddToCart(){
      // ADD TO CART
        dispatch(addToCart(product));
        toast.success("Item added Successfully")
    }
  return (
    <button onClick={() => handleAddToCart()} className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-md text-white">
    <ShoppingCart />
    <span>Add to Cart</span>
  </button>
  )
}
