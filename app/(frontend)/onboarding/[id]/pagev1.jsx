import NewFarmerForm from '@/components/data-display/Forms/NewFarmerForm';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function page({ params:{id} }) {
    // const { id } = await params;
    try {
        const user = await getData(`/users/${id}`);

        return (
            <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto  lg:py-0">
                <div className="max-w-4xl p-4 mx-auto">
                    <h2>Hello {user?.name} , Tell More About Your self</h2>
                </div>
                <NewFarmerForm user={user} />
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return (
            <div className="flex flex-col gap-6 p-16">
                <div className="max-w-4xl p-4 mx-auto">
                    <h2>Failed to load user information</h2>
                </div>
            </div>
        );
    }
}