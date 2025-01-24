import * as React from "react";
import { badgeVariants } from "@/utils/components/core/badgeUtils";
import { cn } from "@/utils/cnUtils";
import { BadgeProps } from "@/types/props/core/badgeProps";

/**
 * Badge component that renders a badge with a specific style.
 * The component allows customization of the badge's appearance using the `variant` prop.
 *
 * @param {BadgeProps} props - The properties for the Badge component.
 * @param {string} [props.className] - An optional additional CSS class to apply to the badge.
 * @param {string} [props.variant] - The variant of the badge, which controls its visual style.
 * @param [props] - Any other props to be passed to the underlying `div` element.
 *
 * @returns The Badge component with the specified styles and props.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge };
