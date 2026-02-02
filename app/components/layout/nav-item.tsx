'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType } from 'react';
import { cn } from "@/app/lib/utils";

interface NavItemProps {
    href: string;
    icon: ElementType;
    label: string;
}

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
        >
            <Icon
                size={20}
                className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
            />
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}