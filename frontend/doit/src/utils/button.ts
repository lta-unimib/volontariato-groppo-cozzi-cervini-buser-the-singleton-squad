import { cva, type VariantProps } from "class-variance-authority"

const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium " +
    "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none " +
    "disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

export const buttonVariants = cva(baseStyles, {
    variants: {
        variant: {
            default: "bg-[var(--primary-color-primary-400)] text-[var(--neutral-color-neutral-100)] hover:bg-[var(--primary-color-primary-500)]",
            destructive: "bg-[var(--red-color-red-200)] text-[var(--neutral-color-neutral-100)] hover:bg-[var(--red-color-red-100)]",
            outline: "border border-[var(--primary-color-primary-500)] bg-transparent text-[var(--primary-color-primary-500)] hover:bg-[var(--primary-alpha-color-primary-alpha-10)] hover:text-[var(--primary-color-primary-500)]",
            secondary: "bg-[var(--primary-color-primary-200)] text-[var(--neutral-color-neutral-100)] hover:bg-[var(--primary-color-primary-300)]",
            ghost: "hover:bg-[var(--neutral-color-neutral-200)] hover:text-[var(--neutral-color-neutral-900)]",
            link: "text-[var(--primary-color-primary-500)] underline-offset-4 hover:underline",
        },
        size: {
            default: "h-12 px-5 py-3 rounded-[var(--radius-full)]",
            sm: "h-9 px-3 rounded-[var(--radius-full)]",
            lg: "h-16 px-10 py-4 rounded-[var(--radius-full)] text-lg",
            icon: "h-12 w-12 rounded-[var(--radius-full)]",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
