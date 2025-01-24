import * as React from "react";
import type {VariantProps} from "class-variance-authority";
import {buttonVariants} from "@/utils/components/core/buttonUtils";

/**
 * Props for the `Button` component.
 *
 * The `Button` component is used to trigger actions, typically for form submissions, navigation, or other interactions.
 *
 * @param className Optional class name to apply additional styles to the `Button` component.
 * @param children The content to be displayed inside the button, such as text or icons.
 * @param variant The visual variant of the button, such as "primary", "secondary", etc. (determined by `buttonVariants`).
 * @param size The size of the button, such as "small", "medium", or "large".
 * @param disabled A boolean that, when `true`, disables the button.
 * @param asChild Optional. When `true`, renders the button as a child element and passes props to that element.
 * @param ...otherProps Other HTML button attributes, such as `onClick`, `type`, `id`, etc.
 */
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

/**
 * Props for the `ButtonBack` component.
 *
 * The `ButtonBack` component is typically used to navigate back to the previous page or step.
 *
 * @param onBack A function to be called when the button is clicked, typically to navigate back.
 */
export interface ButtonBackProps {
    onBack: () => void;
}
