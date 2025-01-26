import { cva } from "class-variance-authority";

/**
 * Button component variants using `class-variance-authority` (CVA).
 * This defines the styles for different button types, sizes, and states such as `default`, `destructive`, `outline`, and others.
 */
export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            /**
             * Different variant styles for the button.
             */
            variant: {
                /**
                 * Default button variant with primary color scheme.
                 */
                default: "bg-primary text-primary-foreground hover:bg-primary/90",

                /**
                 * Destructive variant with error or destructive color scheme.
                 */
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",

                /**
                 * Outline variant with border and background color.
                 */
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",

                /**
                 * Secondary button with a secondary color scheme.
                 */
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

                /**
                 * Ghost variant with no background but a hover effect.
                 */
                ghost: "hover:bg-accent hover:text-accent-foreground",

                /**
                 * Link variant that styles the button as a link.
                 */
                link: "text-primary underline-offset-4 hover:underline",
            },
            /**
             * Button size options.
             */
            size: {
                /**
                 * Default button size.
                 */
                default: "h-10 px-4 py-2 rounded-full",

                /**
                 * Small button size.
                 */
                sm: "h-9 px-3 rounded-full",

                /**
                 * Large button size.
                 */
                lg: "h-11 px-8 rounded-full",

                /**
                 * Icon button size for circular buttons with an icon.
                 */
                icon: "h-10 w-10 rounded-full",
            },
        },
        /**
         * Default variants are set to `default` for both variant and size.
         */
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);