import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/lib/authOptions'
import NewUserForm from '@/components/data-display/Forms/NewUserForm'
import NewFarmerForm from '@/components/data-display/Forms/NewFarmerForm'
import db from '@/lib/db'
import FormHeader from '@/components/forms/FormHeader'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session) return

    const { user } = session

    if (user.role === 'FARMER') {
        // Fetch complete farmer data including user info
        const farmerData = await db.user.findUnique({
            where: { id: user.id },
            include: {
                farmerProfile: true
            }
        })

        return (
            <div className='container mx-auto px-4'>
                <FormHeader title="Update Seller Profile" />
                <NewFarmerForm updateData={farmerData} userId={user.id} />
            </div>
        )
    }

    // Fetch complete user data including profile
    const userData = await db.user.findUnique({
        where: { id: user.id },
        include: {
            userProfile: true
        }
    })

    return (
        <div className='container mx-auto px-4'>
            <FormHeader title="Update Profile" />
            <NewUserForm updateData={userData} userId={user.id} />
        </div>
    )
}
