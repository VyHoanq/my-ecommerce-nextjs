"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ListProfileForm = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const formatDate = (dateString) => {
        if (!dateString) return 'Not provided';
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/profile`);
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const handleEdit = () => {
        router.push(`/dashboard/profile/update`);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>

            <div className="space-y-4">
                {profile?.profileImage && (
                    <div className="flex border-b py-2 items-center justify-center">
                        <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>
                )}
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">First Name:</span>
                    <span className="w-2/3">{profile?.name || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">UserName:</span>
                    <span className="w-2/3">{profile?.username || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Last Name:</span>
                    <span className="w-2/3">{profile?.lastName || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Date of Birth:</span>
                    <span className="w-2/3">{formatDate(profile?.dateOfBirth)}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Email:</span>
                    <span className="w-2/3">{profile?.email || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Phone:</span>
                    <span className="w-2/3">{profile?.phone || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Street Address:</span>
                    <span className="w-2/3">{profile?.streetAddress || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">City:</span>
                    <span className="w-2/3">{profile?.city || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Country:</span>
                    <span className="w-2/3">{profile?.country || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">District:</span>
                    <span className="w-2/3">{profile?.district || 'Not provided'}</span>
                </div>
            </div>
        </div>
    );
};

export default ListProfileForm;
