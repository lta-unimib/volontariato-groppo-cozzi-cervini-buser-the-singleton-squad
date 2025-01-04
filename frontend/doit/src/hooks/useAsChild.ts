import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export function useAsChild(asChild: boolean) {
    return asChild ? Slot : "button"
}
