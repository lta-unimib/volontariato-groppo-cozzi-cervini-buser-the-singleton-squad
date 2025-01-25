import * as React from "react";
import { cn } from "@/utils/cnUtils";

/**
 * A customizable textarea component.
 *
 * This component wraps a `textarea` element with custom styles, focusing on accessibility, responsiveness, and smooth user interactions.
 * It supports various props of a standard `textarea` element, allowing full customization of its behavior and appearance.
 *
 * @param {React.ComponentProps<"textarea">} props - The properties passed to the `textarea` element. These include standard textarea attributes such as `value`, `onChange`, `placeholder`, etc.
 * @param {React.Ref} ref - A ref passed to the `textarea` element, allowing for direct manipulation of the DOM element if needed.
 * @returns {JSX.Element} The rendered `textarea` element with the applied styles.
 */
const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",  // Cambiato text-base a text-sm
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };