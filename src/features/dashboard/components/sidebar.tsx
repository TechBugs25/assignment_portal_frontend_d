'use client';

import React, { useState } from 'react';
import {
    DashboardIcon,
    PermissionIcon,
    TaskIcon,
    TeamIcon,
    MenuIcon,
    CloseIcon,
    EmployeeIcon,
    UsersIcon,
    IdeaIcon
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['ideas', 'tasks']));
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const toggleSection = (section: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(section)) {
            newExpanded.delete(section);
        } else {
            newExpanded.add(section);
        }
        setExpandedSections(newExpanded);
    };

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Toggle Button (Floating or integrated into header) */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden fixed top-3 left-4 z-50 h-10 w-10"
                onClick={toggleSidebar}
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 border-r border-border flex flex-col p-6 bg-muted/40 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center gap-2 mb-10 pl-10 md:pl-0">
                    <div className="bg-primary p-2 rounded-lg text-primary-foreground">📰</div>
                    <h1 className="font-bold text-lg">NewsOffice Pro</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem href="/dashboard" icon={DashboardIcon} label="Dashboard" />

                    {/* Ideas Section */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleSection('ideas')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            <IdeaIcon className="h-5 w-5 shrink-0" />
                            <span className="flex-1 text-left">Ideas</span>
                            {expandedSections.has('ideas') ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.has('ideas') && (
                            <div className="ml-7 space-y-1">
                                <NavItem href="/dashboard/ideas" icon={IdeaIcon} label="All Ideas" />
                                <NavItem href="/dashboard/my-ideas" icon={IdeaIcon} label="My Ideas" />
                            </div>
                        )}
                    </div>

                    {/* Tasks Section */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleSection('tasks')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            <TaskIcon className="h-5 w-5 shrink-0" />
                            <span className="flex-1 text-left">Tasks</span>
                            {expandedSections.has('tasks') ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {expandedSections.has('tasks') && (
                            <div className="ml-7 space-y-1">
                                <NavItem href="/dashboard/tasks" icon={TaskIcon} label="All Tasks" />
                                <NavItem href="/dashboard/my-tasks" icon={TaskIcon} label="My Tasks" />
                                <NavItem href="/dashboard/my-created-tasks" icon={TaskIcon} label="My Created Tasks" />
                            </div>
                        )}
                    </div>

                    <NavItem href="/dashboard/employees" icon={EmployeeIcon} label="Employees" />
                    <NavItem href="/dashboard/permissions" icon={PermissionIcon} label="Permissions" />
                    <NavItem href="/dashboard/users" icon={UsersIcon} label="Users" />
                </nav>
            </aside>
        </>
    );
}
