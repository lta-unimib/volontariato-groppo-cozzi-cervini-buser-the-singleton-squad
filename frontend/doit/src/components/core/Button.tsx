import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cnUtils";
import { buttonVariants } from "@/utils/components/core/buttonUtils";
import { ButtonProps } from "@/types/props/core/buttonProps";

/**
 * Button component that renders a button with customizable styles.
 * The component supports different variants, sizes, and can optionally render as a child component using the `asChild` prop.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the button.
 * @param {string} [props.variant] - The variant of the button that controls its visual style (e.g., "primary", "secondary").
 * @param {string} [props.size] - The size of the button (e.g., "small", "medium", "large").
 * @param {boolean} [props.asChild=false] - If true, the button is rendered as a child component (`Slot`) instead of a standard button element.
 * @param {React.HTMLProps<HTMLButtonElement>} [props] - Any other props to be passed to the underlying `button` or `Slot` element.
 *
 * @returns {JSX.Element} The Button component with the specified styles and props.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
