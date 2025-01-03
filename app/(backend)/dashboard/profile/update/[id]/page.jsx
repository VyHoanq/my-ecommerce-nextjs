import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/lib/authOptions'
import NewUserForm from '@/components/data-display/Forms/NewUserForm'
import NewFarmerForm from '@/components/data-display/Forms/NewFarmerForm'
import db from '@/lib/db'
import FormHeader from '@/components/forms/FormHeader'

export default async function ProfileUpdatePage({ params }) {
    const session = await getServerSession(authOptions)
    if (!session) return null

    const { user } = session
    const { id } = params

    if (user.role === 'FARMER') {
        const farmerData = await db.user.findUnique({
            where: { id },
            include: {
                farmerProfile: true
            }
        })

        return (
            <div className='container mx-auto px-4'>
                <FormHeader title="Update Seller Profile" />
                <NewFarmerForm updateData={farmerData} userId={id} />
            </div>
        )
    }

    // For regular users
    const userData = await db.user.findUnique({
        where: { id },
        include: {
            profile: true  // Changed from userProfile to profile
        }
    })

    if (!userData) {
        return <div>User not found</div>
    }

    return (
        <div className='container mx-auto px-4'>
            <FormHeader title="Update Profile" />
            <NewUserForm updateData={userData} userId={id} />
        </div>
    )
}
