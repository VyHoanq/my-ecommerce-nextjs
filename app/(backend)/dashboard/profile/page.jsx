"use client";
import PageHeader from "@/components/backend/layout/PageHeader";
import ListFarmerForm from "@/components/data-display/Forms/ListFarmerForm";
import ListProfileForm from "@/components/data-display/Forms/ListProfileForm";
import { useSession } from "next-auth/react";
import React from "react";

export default function ProfilePage() {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    const getProfileContent = () => {
        if (userRole === 'FARMER') {
            return {
                title: "Seller Profile",
                href: `/dashboard/profile/update`,
                linkTitle: "Update Seller Profile",
                component: <ListFarmerForm userId={userId} userRole="FARMER" />
            };
        }

        if (userRole === 'USER') {
            return {
                title: "User Profile",
                href: `/dashboard/profile/update/${userId}`,
                linkTitle: "Update User Profile",
                component: <ListProfileForm userId={userId} userRole="USER" />
            };
        }

        return {
            title: "Profile",
            href: "/dashboard/profile/update",
            linkTitle: "Update Profile",
            component: <ListProfileForm userId={userId} userRole={userRole} />
        };
    };

    const profileContent = getProfileContent();

    return (
        <div>
            <PageHeader
                title={profileContent.title}
                href={profileContent.href}
                linkTitle={profileContent.linkTitle}
            />
            {profileContent.component}
        </div>
    );
}
