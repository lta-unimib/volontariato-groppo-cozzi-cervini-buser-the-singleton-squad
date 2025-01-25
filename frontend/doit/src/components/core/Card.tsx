import * as React from "react";
import { cn } from "@/utils/cnUtils";

/**
 * Card component that wraps content in a stylized container with a border, background, and shadow.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the Card component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the card.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The Card component with the specified styles and props.
 */
const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

/**
 * CardHeader component that wraps the header section of the card, typically for titles or descriptions.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the CardHeader component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the header.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The CardHeader component with the specified styles and props.
 */
const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle component that displays the title of the card with emphasized text.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the CardTitle component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the title.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The CardTitle component with the specified styles and props.
 */
const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription component that displays a description or additional information about the card.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the CardDescription component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the description.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The CardDescription component with the specified styles and props.
 */
const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent component that wraps the main content area of the card.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the CardContent component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the content.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The CardContent component with the specified styles and props.
 */
const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter component that wraps the footer section of the card, typically for actions or metadata.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the CardFooter component.
 * @param {string} [props.className] - Optional additional CSS class to apply to the footer.
 * @param {React.Ref<HTMLDivElement>} ref - A ref that can be used to access the underlying `div` element.
 *
 * @returns JSX.Element The CardFooter component with the specified styles and props.
 */
const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

// Exporting all Card components for use in other parts of the application.
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
