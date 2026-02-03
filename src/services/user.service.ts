"use server";

import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { Profile } from "@/features/dashboard/profile/types";

export async function getUserProfile(userId: string): Promise<Profile | null> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        return null;
    }

    try {
        const response = await fetch(`${baseUrl}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch profile:", response.statusText);
            return null;
        }

        const { user, department } = await response.json();
        const e = user.employee;

        return {
            id: e.staffId,
            name: `${e.firstName} ${e.lastName}`,
            email: user.email ?? "",
            phone: e.mobileNumber,
            gender: e.gender,
            status: e.status === "active" ? "ACTIVE" : "INACTIVE",
            employmentType: e.employmentType,
            joinedAt: e.joinDate,
            lastDate: e.lastDate ?? "N/A",
            department: department ?? "N/A",
            avatarUrl: e.profilePicture?.path
                ? `${baseUrl}/${e.profilePicture.path.replace(/\\/g, '/')}` // replace backslashes
                : `https://i.pravatar.cc/150?u=${userId}`,

        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
