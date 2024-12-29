import React from 'react';
import Link from 'next/link';

export default function OverviewCard({ sales, products }) {
  const productsCount = products.length.toString().padStart(2,"0") 
  const salesCount = sales.length.toString().padStart(2,"0") 
  const totalSales = sales.reduce((acc, item) => acc + item.total, 0);  

  const analytics = [
    {
      title: 'Products',
      count: productsCount,
      link: '/dashboard/products',
      icon: '🛍️ ', // Icon cho sản phẩm
    },
    {
      title: 'Sales',
      count: salesCount,
      link: '/dashboard/sales',
      icon: '💵', // Icon cho doanh số
    },
    {
      title: 'Total Revenue',
      count: totalSales,
      link: '/dashboard/sales',
      icon: '📊', // Icon cho tổng doanh thu
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {analytics.map((item, i) => (
        <div
          key={i} // Sử dụng i làm key
          className="bg-gray-800 text-white p-4 rounded-md shadow-sm flex justify-between items-center"
        >
          {/* Bên trái: Chữ và số */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-xl font-bold">{item.count}</p>
            <hr className="border-gray-700 my-2" />
            {/* Link tới View reports */}
            <Link href={item.link} legacyBehavior>
              <a className="text-blue-400 hover:text-blue-500 text-sm">View reports</a>
            </Link>
          </div>

          {/* Bên phải: Icon */}
          <span className="text-3xl">{item.icon}</span>
        </div>
      ))}
    </div>
  );
}
