"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

/**
 * A Separator component for creating horizontal or vertical dividers.
 *
 * This component renders a separator with a customizable orientation (horizontal or vertical).
 *
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - The properties passed to the Separator component.
 * @param {string} [props.orientation="horizontal"] - The orientation of the separator (default is "horizontal").
 * @param {boolean} [props.decorative=true] - Whether the separator is decorative (default is true).
 * @param {React.Ref} ref - A ref passed to the separator element.
 * @returns {JSX.Element} The rendered Separator component.
 */
const Separator = React.forwardRef<
    ComponentRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
