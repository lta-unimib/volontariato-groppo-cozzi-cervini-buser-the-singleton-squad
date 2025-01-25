"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/utils/cnUtils"

/**
 * A customizable switch component built using Radix UI's switch primitives.
 *
 * The `Switch` component allows users to toggle between two states, such as on/off, using a sliding thumb.
 * The appearance and behavior can be customized using CSS classes.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>} props - The properties passed to the Switch component.
 * @param {React.Ref} ref - A ref passed to the root switch element.
 * @returns {JSX.Element} The rendered Switch component.
 */
const Switch = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        ref={ref}
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className
        )}
        {...props}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            )}
        />
    </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }