import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/lib/authOptions'

export default async function page() {
    const session = await getServerSession(authOptions)

    if (!session) return
    const { user } = session
    return (
        <div className='text-black'>
            <h2>Welcome {user?.name}</h2>
        </div>
    )
}