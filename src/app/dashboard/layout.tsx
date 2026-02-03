import React from "react";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/features/dashboard/components/header";
import { Sidebar } from "@/features/dashboard/components/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.accessToken) {
        redirect("/login");
    }

    const user = session?.user;

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader user={user} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}
