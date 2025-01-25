"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/utils/cnUtils"
import {ComponentRef} from "react";

/**
 * `TooltipProvider` is a context provider component that must wrap all tooltip components in the application.
 * It manages the state and behavior of all tooltips within its scope.
 *
 * @returns {JSX.Element} The rendered provider component.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * `Tooltip` is the root component for the tooltip, which manages its state.
 * It should wrap the entire tooltip structure, including the trigger and content.
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Root>} props - The props to pass to the Tooltip component.
 * @returns {JSX.Element} The rendered tooltip root component.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * `TooltipTrigger` is the component that triggers the tooltip when hovered or focused.
 * It should wrap the element that activates the tooltip.
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Trigger>} props - The props to pass to the TooltipTrigger component.
 * @returns {JSX.Element} The rendered tooltip trigger component.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * `TooltipContent` is the component that displays the content of the tooltip.
 * It is responsible for positioning and animation of the tooltip's appearance.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional additional class names to apply to the tooltip content.
 * @param {number} [props.sideOffset=4] - The offset distance between the trigger and tooltip content.
 * @param {React.Ref} ref - A ref to the TooltipContent component.
 * @returns {JSX.Element} The rendered tooltip content component.
 */
const TooltipContent = React.forwardRef<
    ComponentRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };