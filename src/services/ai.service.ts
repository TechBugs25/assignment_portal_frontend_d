"use server";

import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function generateAIContent(prompt: string): Promise<string> {
    const baseUrl = process.env.BACKEND_LINK || "http://localhost:3001";

    // Get session for authentication
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        throw new Error("Unauthorized: No access token found");
    }

    try {
        const response = await fetch(`${baseUrl}/ai/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            console.error("Failed to generate AI content:", response.statusText);
            throw new Error("Failed to generate content");
        }

        const data = await response.json();

        // Use the 'content' field from the response as per user confirmation
        return data.content || "";
    } catch (error) {
        console.error("Error generating AI content:", error);
        throw error;
    }
}
