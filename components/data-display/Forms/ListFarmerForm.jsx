"use client";
import React, { useEffect, useState } from 'react';

const ListFarmerForm = ({ userId }) => {
    const [farmer, setFarmer] = useState(null);

    useEffect(() => {
        const fetchFarmerData = async () => {
            try {
                const response = await fetch(`/api/farmers/${userId}`);
                const data = await response.json();
                setFarmer(data);
            } catch (error) {
                console.error("Error fetching farmer data:", error);
            }
        };

        if (userId) {
            fetchFarmerData();
        }
    }, [userId]);


    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md text-black">
            <div className="space-y-4">
                {farmer?.farmerProfile?.profileImageUrl && (
                    <div className="flex border-b py-2 items-center justify-center">
                        <img
                            src={farmer.farmerProfile.profileImageUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>
                )}
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Email:</span>
                    <span className="w-2/3">{farmer?.email || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Seller Code:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.code || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">First Name:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.firstName || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Last Name:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.lastName || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Contact Person:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.contactPerson || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Phone:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.phone || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Physical Address:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.physicalAddress || 'Not provided'}</span>
                </div>

                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Terms:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.terms || 'Not provided'}</span>
                </div>
                <div className="flex border-b py-2">
                    <span className="font-semibold w-1/3">Products:</span>
                    <span className="w-2/3">{farmer?.farmerProfile?.products?.join(', ') || 'No products listed'}</span>
                </div>
            </div>
        </div>
    );
};

export default ListFarmerForm;
