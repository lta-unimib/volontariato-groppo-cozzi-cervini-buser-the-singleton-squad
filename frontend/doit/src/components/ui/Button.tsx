import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantProps } from "@/utils/button"
import { useAsChild } from "@/hooks/useAsChild"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = useAsChild(asChild)

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
