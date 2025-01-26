"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/cnUtils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * A component that renders an individual tab trigger.
 *
 * `TabsTrigger` represents each tab in the tab list. It manages the active state, appearance, and interaction.
 * When a user clicks on a tab trigger, the corresponding `TabsContent` is displayed.
 *
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - The properties passed to the individual tab trigger.
 * @param {React.Ref} ref - A ref passed to the tab trigger element.
 * @returns {JSX.Element} The rendered individual Tabs trigger component.
 */
const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * A component that renders the content of a tab.
 *
 * `TabsContent` is used to display the content associated with an active tab. When a tab is clicked,
 * the content for that tab becomes visible.
 *
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>} props - The properties passed to the tab content component.
 * @param {React.Ref} ref - A ref passed to the content element.
 * @returns {JSX.Element} The rendered Tabs content component.
 */
const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
