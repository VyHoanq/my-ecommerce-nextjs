
import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function GET(request) {
    try {
        // Fetch users with the role "USER" and include their profile information
        const customers = await db.user.findMany({
            where: {
                role: {
                    in: ["USER", "FARMER"]
                }
            },
            include: {
                profile: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            message: "Failed to fetch users",
            error: error.message
        }, { status: 500 });
    }
}