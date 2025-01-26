import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cnUtils";
import { buttonVariants } from "@/utils/components/core/buttonUtils";
import { ButtonProps } from "@/types/props/core/buttonProps";

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
