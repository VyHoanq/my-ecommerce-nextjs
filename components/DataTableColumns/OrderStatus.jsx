"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Status({ row, accessorKey }) {
    const savedOrderStatus = row.getValue(`${accessorKey}`);
    const orderId = row.original.id;
    const [orderStatus, setOrderStatus] = useState(savedOrderStatus);
    const [loading, setLoading] = useState(false);

    const orderStatusOptions = [
        { value: "PENDING", label: "Pending", color: "gray" },
        { value: "PROCESSING", label: "Processing", color: "blue" },
        { value: "SHIPPED", label: "Shipped", color: "yellow" },
        { value: "DELIVERED", label: "Delivered", color: "green" },
        { value: "CANCELED", label: "Canceled", color: "red" },
    ];

    async function handleChange(e) {
        const newStatus = e.target.value;
        setOrderStatus(newStatus);

        const data = { orderStatus: newStatus }; // Chỉ gửi `orderStatus` tới API
        try {
            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setLoading(false);
                toast.success(`Order status updated to ${newStatus}`);
            } else {
                setLoading(false);
                toast.error("Failed to update order status.");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("An error occurred while updating order status.");
        }
    }

    const currentColor =
        orderStatusOptions.find((option) => option.value === orderStatus)?.color ||
        "gray";

    return (
        <>
            {loading ? (
                <p>Updating...</p>
            ) : (
                <select
                    id="orderStatus"
                    className={`bg-gray-50 border border-${currentColor}-300 text-gray-900 text-sm rounded-lg focus:ring-${currentColor}-500 focus:border-${currentColor}-500 block w-full p-2.5`}
                    value={orderStatus} // Giá trị hiện tại
                    onChange={handleChange} // Thay đổi trạng thái
                >
                    {orderStatusOptions.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            style={{ color: option.color }}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
