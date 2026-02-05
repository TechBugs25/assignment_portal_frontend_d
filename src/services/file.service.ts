"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export interface UploadedFile {
    id: string;
    uniqueName: string;
    originalName: string;
    path: string;
    mimeType: string;
    sizeKb: number;
    storage: string;
    createdAt: string;
    updatedAt: string;
}

export interface FileUploadResponse {
    success: boolean;
    file?: UploadedFile;
    message?: string;
}

export async function uploadFile(formData: FormData): Promise<FileUploadResponse> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await fetch(`${baseUrl}/file/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to upload file",
            };
        }

        return { success: true, file: data.file };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, message: "An error occurred while uploading the file" };
    }
}

export async function deleteFile(fileId: string): Promise<{ success: boolean; message?: string }> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await fetch(`${baseUrl}/file/${fileId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
            },
        });

        if (!response.ok) {
            const data = await response.json();
            return {
                success: false,
                message: data.message || "Failed to delete file",
            };
        }

        return { success: true };
    } catch (error) {
        console.error("Error deleting file:", error);
        return { success: false, message: "An error occurred while deleting the file" };
    }
}
