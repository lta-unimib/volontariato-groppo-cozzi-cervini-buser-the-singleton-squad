"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

/**
 * A PopoverContent component for displaying popover content using Radix UI's PopoverPrimitive.
 *
 * This component renders the content of a popover, with customizable alignment and side offset,
 * and supports animations for the popover's opening and closing.
 *
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>} props - The properties passed to the PopoverContent component.
 * @param {string} [props.className] - Additional CSS classes to apply to the popover content.
 * @param {string} [props.align="center"] - The alignment of the popover content (default is "center").
 * @param {number} [props.sideOffset=4] - The offset of the popover from the side it is aligned to (default is 4).
 * @param {React.Ref} ref - A ref passed to the root element of the popover content.
 * @returns {JSX.Element} The rendered PopoverContent component with the applied styles.
 */
const PopoverContent = React.forwardRef<
    ComponentRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { PopoverContent }