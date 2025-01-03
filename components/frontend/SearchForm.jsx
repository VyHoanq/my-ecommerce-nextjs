'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function SearchForm() {
    const { register, handleSubmit, reset } = useForm()
    const router = useRouter()

    function handleSearch(data) {
        const { searchTerm } = data;
        console.log(searchTerm)
        reset()
        router.push(`/search?search=${searchTerm}`)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="flex items-center max-w-lg mx-auto">

            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <input
                    {...register("searchTerm")}
                    type="text"
                    id="voice-search"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full ps-10 p-2.5  dark:bg-white dark:text-black-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" placeholder="Search Products, Categories, Markets ...." required
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-purple-800 rounded-lg border border-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 sm:px-2"
            >
                <SearchIcon className="w-4 h-4 me-2" />
                <span className="hidden sm:inline">Search</span>
            </button>
        </form>
    )
}
