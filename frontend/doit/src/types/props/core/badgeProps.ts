import * as React from "react";
import {BadgeVariants} from "@/utils/components/core/badgeUtils";

/**
 * Props for the `Badge` component.
 *
 * The `Badge` component is used to display a small, often circular indicator, usually for notifications, statuses, or labels.
 *
 * @param className Optional class name to apply additional styles to the `Badge` component.
 * @param children The content to be displayed inside the badge, such as text or icons.
 * @param variant The variant type of the badge, determining its style (e.g., "success", "error", "info").
 * @param ...otherProps Other HTML attributes that can be applied to the `Badge` component, such as `id`, `style`, etc.
 */
export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        BadgeVariants {}
