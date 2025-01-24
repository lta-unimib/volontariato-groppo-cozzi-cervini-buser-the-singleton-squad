"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/sidebar/Sidebar";
import { ComponentProps } from "react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

type SidebarProps = ComponentProps<typeof Sidebar>;

type AppSidebarProps = {
    menuItems: MenuItem[];
    header: string;
    side?: SidebarProps["side"];
    variant?: SidebarProps["variant"];
    collapsible?: SidebarProps["collapsible"];
}

export function AppSidebar({
                               menuItems,
                               side,
                               variant,
                               collapsible,
                           }: AppSidebarProps) {
    const [activeItem, setActiveItem] = useState<string>('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentItem = menuItems.find(item => item.url === currentPath);
        if (currentItem) {
            setActiveItem(currentItem.url);
        }
    }, [menuItems]);

    return (
        <Sidebar side={side} variant={variant} collapsible={collapsible}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={activeItem === item.url}
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex flex-col items-center md:flex-row md:gap-3"
                                            onClick={() => setActiveItem(item.url)}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="hidden md:inline">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <span className="mb-6 py-1 text-xs md:hidden">{item.title}</span>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}