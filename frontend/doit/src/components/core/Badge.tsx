import * as React from "react"
import { badgeVariants } from "@/utils/components/core/badgeUtils"
import { cn } from "@/utils/cnUtils"
import { BadgeProps } from "@/types/props/core/badgeProps"

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge }
