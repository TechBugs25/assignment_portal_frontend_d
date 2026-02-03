import {Profile} from "./types";
import {getUserProfile} from "@/services/user.service";
import {cookies} from "next/headers";
import {decrypt} from "@/lib/session";

export async function getProfile(): Promise<Profile> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    // Use the ID from session if available, otherwise use the test ID provided by the user
    const userId: string = session?.user?.id ?? '';

    const profile = await getUserProfile(userId);

    if (!profile) {
        // Return a fallback or throw error depending on desired UX
        return {
            id: userId,
            name: "Loading Error",
            email: "error@example.com",
            phone: "N/A",
            gender: "N/A",
            status: "INACTIVE",
            joinedAt: "N/A",
            lastDate: "N/A",
            department: "N/A",
            avatarUrl: "https://i.pravatar.cc/150?u=" + userId,
        };
    }

    return profile;
}
