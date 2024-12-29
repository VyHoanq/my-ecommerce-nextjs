import React from 'react'
import { Search, Trash2 , Download } from 'lucide-react'
export default function TableActions() {
  return (
    <div className="flex justify-between py-6 px-12  bg-white dark:bg-slate-700 rounded-lg items-center gap-8  ">
    <button className='flex items-center justify-center text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 space-x-2'> 
       <Download/>
       <span>Export</span>
     </button>
    <div className="flex-grow  ">
  <label htmlFor="table-search" className="sr-only">Search</label>
  <div className="relative ">
      <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className='w-4 h-4 text-gray-500 dark:text-gray-400'/>
      </div>
      <input type="text" id="table-search" className="block py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-700 dark:focus:border-purple-700 w-full" placeholder="Search for items"/>
    </div>
    </div>
    <button className="flex items-center space-x-2 bg-red-600 text-white rounded-lg px-6 py-3" >
      <Trash2/>
      <span> Bulk Delete </span>
     </button>

  </div>
  )
}
