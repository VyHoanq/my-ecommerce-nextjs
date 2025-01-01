import OpenAI from "openai";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse JSON từ request
        const { userId, message } = await request.json();

        // Kiểm tra xem user có tồn tại hay không
        const existingUser = await db.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            return NextResponse.json(
                {
                    status: 404,
                    message: `User với ID (${userId}) không tồn tại trong cơ sở dữ liệu.`,
                },
                { status: 404 }
            );
        }

        // Tạo kết nối với OpenAI
        const openai = new OpenAI({
            apiKey: "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",
        });

        // Chuẩn bị messages để gửi đến GPT
        const chats = [
            { role: "assistant", content: "You are a helpful assistant." },
            { role: "user", content: message },
        ];

        // Update the chat completion call
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message }
            ]
        });


        // Lấy phản hồi từ GPT
        const assistantMessage = chatResponse.choices[0].message.content;

        // Lưu đoạn chat của user vào cơ sở dữ liệu
        const userChat = await db.chat.create({
            data: {
                role: "user",
                message: message,
                userId: userId,
            },
        });

        // Lưu đoạn chat của assistant vào cơ sở dữ liệu
        const assistantChat = await db.chat.create({
            data: {
                role: "assistant",
                message: assistantMessage,
                userId: userId,
            },
        });

        // Lấy danh sách đoạn chat mới nhất của user
        const chatHistory = await db.chat.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "asc", // Sắp xếp theo thứ tự thời gian
            },
        });

        // Gửi phản hồi về client
        return NextResponse.json(
            {
                status: 200,
                message: "Thành công",
                data: chatHistory, // Danh sách đoạn chat
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing GPT response:", error);
        return NextResponse.json(
            {
                status: 500,
                message: "Lỗi khi xử lý phản hồi từ GPT",
            },
            { status: 500 }
        );
    }
}
