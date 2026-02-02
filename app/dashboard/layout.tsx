import React from "react";
import { NavItem } from "@/app/components/layout/nav-item";
import { DashboardIcon, PermissionIcon, StoryIcon, TaskIcon, TeamIcon } from "@/app/components/ui/icons";
import { Button } from "@/app/components/ui/button";
import { DashboardHeader } from "./header";

import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = await decrypt(sessionCookie);
    const user = session?.user;

    return (
        <div className="flex h-screen bg-background text-foreground">
            <aside className="w-64 border-r border-border flex flex-col p-6 bg-muted/40">
                <div className="flex items-center gap-2 mb-10">
                    <div className="bg-primary p-2 rounded-lg text-primary-foreground">📰</div>
                    <h1 className="font-bold text-lg">NewsOffice Pro</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {/* Pass the component name directly, and add the href */}
                    <NavItem href="/dashboard" icon={DashboardIcon} label="Dashboard" />
                    <NavItem href="/dashboard/stories" icon={StoryIcon} label="Stories" />
                    <NavItem href="/dashboard/team" icon={TeamIcon} label="Team" />
                    <NavItem href="/dashboard/tasks" icon={TaskIcon} label="Tasks" />
                    <NavItem href="/dashboard/permissions" icon={PermissionIcon} label="Permissions" />
                </nav>

                <Button className="w-full mt-auto">
                    + New Story
                </Button>
            </aside>

            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader user={user} />
                <main className="flex-1 overflow-y-auto p-8 bg-background">{children}</main>
            </div>
        </div>
    );
}