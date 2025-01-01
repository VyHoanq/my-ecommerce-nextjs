import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const farmerProfile = await db.farmerProfile.findUnique({
            where: { userId: id },
        });
        return NextResponse.json(farmerProfile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch farmer profile", error },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    const { id } = params;
    try {
        const data = await request.json();
        const farmerProfile = await db.farmerProfile.create({
            data: {
                ...data,
                userId: id,
                code: `FARMER-${Date.now()}`,
                isActive: true
            },
        });
        return NextResponse.json(farmerProfile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create farmer profile", error },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const data = await request.json();
        // Remove undefined or null values
        Object.keys(data).forEach(key => {
            if (data[key] === undefined || data[key] === null) {
                delete data[key];
            }
        });

        const farmerProfile = await db.farmerProfile.update({
            where: { userId: id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                physicalAddress: data.physicalAddress,
                contactPerson: data.contactPerson,
                profileImageUrl: data.profileImageUrl,
                terms: data.terms,
                products: data.products
            },
        });
        return NextResponse.json(farmerProfile);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update farmer profile", error },
            { status: 500 }
        );
    }
}
