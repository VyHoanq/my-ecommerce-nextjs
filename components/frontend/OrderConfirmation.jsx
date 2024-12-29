"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";

export default function OrderConfirmation({ children }) {
    const dispatch = useDispatch();

    // Clear cart on mount
    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return <>{children}</>;
}
