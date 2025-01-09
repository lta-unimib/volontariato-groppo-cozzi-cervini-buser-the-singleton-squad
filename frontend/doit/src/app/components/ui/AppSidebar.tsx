"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/Sidebar";
import type { ComponentProps } from "react";
import React from "react";

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
    return (
        <Sidebar side={side} variant = {variant} collapsible={collapsible}>
            <SidebarContent>
            <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}