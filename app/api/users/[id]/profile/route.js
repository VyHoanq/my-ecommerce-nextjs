import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const profile = await db.userProfile.findUnique({
            where: { userId: id },
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch profile", error },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    const { id } = params;
    try {
        const data = await request.json();
        const profile = await db.userProfile.create({
            data: {
                ...data,
                userId: id,
            },
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create profile", error },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params: { id } }) {
    try {
        const existingUser = await db.user.findUnique({
            where: {
                id,
            },
        });
        if (!existingUser) {
            return NextResponse.json(
                {
                    data: null,
                    message: "User Not Found",
                },
                { status: 404 }
            );
        }
        const deletedUser = await db.user.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(deletedUser);
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to Delete User",
                error,
            },
            { status: 500 }
        );
    }
}
export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const data = await request.json();

        // Get current user profile
        const currentProfile = await db.userProfile.findUnique({
            where: { userId: id }
        });

        // If no new image is provided, keep the existing one
        const profileImage = data.profileImage || currentProfile.profileImage;


        // Convert dateOfBirth string to DateTime format
        if (data.dateOfBirth) {
            data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
        }

        const profile = await db.userProfile.update({
            where: { userId: id },
            data: {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                dateOfBirth: data.dateOfBirth,
                phone: data.phone,
                streetAddress: data.streetAddress,
                city: data.city,
                country: data.country,
                district: data.district,
                profileImage: profileImage
            },
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update profile", error: error.message },
            { status: 500 }
        );
    }
}
