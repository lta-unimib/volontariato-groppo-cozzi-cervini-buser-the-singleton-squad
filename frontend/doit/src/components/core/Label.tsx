"use client"

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cnUtils";
import { ComponentRef } from "react";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * `Label` component that uses Radix UI for adding labels to input or other form components.
 * The component supports configurable style variants and utilizes `class-variance-authority`
 * for flexible style management.
 *
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Properties to be passed to the Radix UI `Label` component.
 * @param {VariantProps<typeof labelVariants>} [props.variant] - Optional style variants that can be applied to the component.
 *
 * @returns {React.ReactElement} - The rendered `Label` component.
 */
const Label = React.forwardRef<
    ComponentRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
