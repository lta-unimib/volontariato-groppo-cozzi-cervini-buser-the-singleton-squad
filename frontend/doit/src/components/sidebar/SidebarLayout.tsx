"use client"

import React from "react";
import { SidebarProvider, SidebarTrigger, Sidebar } from "@/components/sidebar/Sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
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

/**
 * `SidebarLayout` is a layout component that integrates a sidebar and a main content area.
 * It includes a sidebar with menu items, a header, and the ability to customize the sidebar's position, variant, and collapsibility.
 *
 * @param {Object} props - The component props.
 * @param {MenuItem[]} props.menuItems - An array of menu items to be displayed in the sidebar. Each item includes a title, URL, and an icon.
 * @param {string} props.header - The header to be displayed in the sidebar.
 * @param {SidebarProps["side"]} [props.side] - The position of the sidebar, either "left" or "right".
 * @param {SidebarProps["variant"]} [props.variant] - The variant of the sidebar (e.g., "default", "compact").
 * @param {SidebarProps["collapsible"]} [props.collapsible] - Whether the sidebar can collapse or not.
 * @param {React.ReactNode} props.children - The content to be displayed in the main section of the layout.
 * @returns The rendered layout with sidebar and main content.
 */
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
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}