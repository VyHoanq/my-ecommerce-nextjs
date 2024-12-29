'use client'
import React, { useState } from 'react'
import data from '@/data.json'
export default function CustomDataTable() {
    const arr = [1, 2, 3, 4, 5]
    const PAGE_SIZE = 10
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const currentedDisplayed = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / PAGE_SIZE)
    const itemStartIndex = startIndex + 1
    const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length)
    // function handlePageChange(page) {
    //     console.log(page)
    //     // setCurrentPage(page)
    // }
    return (
        <div className='mt-4'>
            <h2 className='text-xl font-bold mb-4 p-8 dark:text-slate-50 text-black'>Recent Orders</h2>
            {/* Table */}
            <div className='p-4'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentedDisplayed.map((item, i) => {
                                    return (
                                        <tr key={i} className="bg-white dark:bg-black text-black dark:text-white border-b   hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600" />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                                {item.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.first_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.last_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <span className="text-md font-normal text-gray-300  mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-50 ">{itemStartIndex}-{itemEndIndex}</span> of <span className="font-semibold text-gray-50 ">{data.length}</span></span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-14">
                            <li>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === startIndex}
                                    className="flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700    dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                            </li>
                            {
                                Array.from({ length: totalPages }, (_, i) => {
                                    return (
                                        <li key={i}>
                                            <button
                                                onClick={() => setCurrentPage(i + 1)}
                                                disabled={currentPage == i + 1}
                                                className={currentPage == i + 1 ? "flex items-center justify-center px-3 h-10 leading-tight text-gray-50 bg-blue-600 border border-blue-300 hover:bg-blue-800 hover:text-white    dark:hover:bg-gray-700 dark:hover:text-white" : "flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700    dark:hover:bg-gray-700 dark:hover:text-white"}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            <li>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    href="#" className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700    dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

    )
}
