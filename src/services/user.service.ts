"use server";

import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { Profile } from "@/features/dashboard/profile/types";
import { User, PaginationMeta, UsersResponse } from "@/features/users/types";

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
                ? `${baseUrl}/${e.profilePicture.path.replace(/\\/g, '/')}`
                : `https://i.pravatar.cc/150?u=${userId}`,
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export interface GetUsersResult {
    users: User[];
    meta: PaginationMeta;
}

export async function getUsers(page: number = 1, limit: number = 10): Promise<GetUsersResult> {
    const baseUrl = process.env.BACKEND_LINK;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    const emptyResult: GetUsersResult = {
        users: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };

    if (!session?.accessToken) {
        return emptyResult;
    }

    try {
        const response = await fetch(`${baseUrl}/user?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch users:", response.statusText);
            return emptyResult;
        }

        const data: UsersResponse = await response.json();

        return {
            users: data.users || [],
            meta: data.meta || { page: 1, limit: 10, total: 0, totalPages: 0 }
        };
    } catch (error) {
        console.error("Error fetching users list:", error);
        return emptyResult;
    }
}
