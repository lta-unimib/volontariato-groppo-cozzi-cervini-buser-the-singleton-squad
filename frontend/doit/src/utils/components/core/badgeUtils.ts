import { cva, type VariantProps } from "class-variance-authority"

/**
 * Badge component variants using `class-variance-authority` (CVA).
 * This defines the styles for different badge types such as `default`, `secondary`, `destructive`, and `outline`.
 */
export const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            /**
             * Different variant styles for the badge.
             */
            variant: {
                /**
                 * Default variant with primary color scheme.
                 */
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",

                /**
                 * Secondary variant with secondary color scheme.
                 */
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",

                /**
                 * Destructive variant with error or destructive color scheme.
                 */
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",

                /**
                 * Outline variant with only text, no background or border.
                 */
                outline: "text-foreground",
            },
        },
        /**
         * Default variant is set to `default`.
         */
        defaultVariants: {
            variant: "default",
        },
    }
)

/**
 * Type for the Badge component's props derived from the `badgeVariants` configuration.
 * This ensures type safety when using the badge component in TypeScript.
 */
export type BadgeVariants = VariantProps<typeof badgeVariants>
