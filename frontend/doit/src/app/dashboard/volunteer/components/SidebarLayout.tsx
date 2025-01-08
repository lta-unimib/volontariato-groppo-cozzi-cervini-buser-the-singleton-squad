"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import React from "react";
import {AppSidebar} from "@/app/dashboard/volunteer/components/AppSidebar";

interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface LayoutProps {
    menuItems: MenuItem[];
    header: string;
    children: React.ReactNode;
}

export default function SidebarLayout({ menuItems, header, children }: LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar menuItems={menuItems} header={header}/>
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
