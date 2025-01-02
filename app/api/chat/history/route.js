import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        const chatHistory = await db.chat.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return NextResponse.json({
            status: 200,
            data: chatHistory
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Failed to fetch chat history"
        });
    }
}
