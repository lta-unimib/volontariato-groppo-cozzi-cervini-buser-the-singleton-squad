"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

/**
 * A ScrollArea component that provides a customizable scrollable area using Radix UI's ScrollAreaPrimitive.
 *
 * This component creates a scrollable container with a scrollbar and an optional corner.
 * It supports both vertical and horizontal scrolling.
 *
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>} props - The properties passed to the ScrollArea component.
 * @param {string} [props.className] - Additional CSS classes to apply to the scroll area.
 * @param {React.ReactNode} [props.children] - The content to be rendered inside the scroll area.
 * @param {React.Ref} ref - A ref passed to the root element of the scroll area.
 * @returns {JSX.Element} The rendered ScrollArea component with the applied styles and children.
 */
const ScrollArea = React.forwardRef<
    ComponentRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * A ScrollBar component for customizing the scrollbar within a ScrollArea.
 *
 * This component renders a scrollbar with the option to be oriented vertically or horizontally.
 *
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>} props - The properties passed to the ScrollBar component.
 * @param {string} [props.className] - Additional CSS classes to apply to the scrollbar.
 * @param {string} [props.orientation="vertical"] - The orientation of the scrollbar (default is "vertical").
 * @param {React.Ref} ref - A ref passed to the scrollbar element.
 * @returns {JSX.Element} The rendered ScrollBar component with the applied styles.
 */
const ScrollBar = React.forwardRef<
    ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            "flex touch-none select-none transition-colors",
            orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]",
            orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-[1px]",
            className
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }