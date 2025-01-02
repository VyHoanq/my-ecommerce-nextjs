import OpenAI from "openai";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const { userId, message } = await request.json();

        // Save user message to database
        await db.chat.create({
            data: {
                userId,
                role: "user",
                message
            }
        });

        // Get chat history
        const previousMessages = await db.chat.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }
        });

        // Format messages for OpenAI
        const messages = previousMessages.map(msg => ({
            role: msg.role,
            content: msg.message
        }));

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        // Save AI response
        await db.chat.create({
            data: {
                userId,
                role: "assistant",
                message: completion.choices[0].message.content
            }
        });

        // Return updated chat history
        const chatHistory = await db.chat.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }
        });

        return NextResponse.json({
            status: 200,
            data: chatHistory
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({
            status: 500,
            message: "Error processing chat"
        });
    }
}
