"use client"

import React from "react";
import { SidebarProvider, SidebarTrigger, Sidebar } from "@/components/refactored/sidebar/Sidebar";
import { AppSidebar } from "@/components/refactored/sidebar/AppSidebar";
import type { ComponentProps } from "react";

interface MenuItem {
    readonly title: string;
    readonly url: string;
    readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

type SidebarProps = ComponentProps<typeof Sidebar>;

interface LayoutProps {
    menuItems: MenuItem[];
    header: string;
    side?: SidebarProps["side"];
    variant?: SidebarProps["variant"];
    collapsible?: SidebarProps["collapsible"];
    children: React.ReactNode;
}

export default function SidebarLayout({
                                          menuItems,
                                          header,
                                          side,
                                          variant,
                                          collapsible,
                                          children
                                      }: LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar
                menuItems={menuItems}
                header={header}
                side={side}
                variant={variant}
                collapsible={collapsible}
            />
            <main className="relative">
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    );
}