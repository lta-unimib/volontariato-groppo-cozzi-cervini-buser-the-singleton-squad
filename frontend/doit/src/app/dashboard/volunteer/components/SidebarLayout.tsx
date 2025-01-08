"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import React from "react";
import {AppSidebar} from "@/app/dashboard/volunteer/components/AppSidebar";

interface MenuItem {
    readonly title: string;
    readonly url: string;
    readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface LayoutProps {
    menuItems: MenuItem[];
    header: string;
    children: React.ReactNode;
}

export default function SidebarLayout({ menuItems, children }: LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar menuItems={menuItems} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
