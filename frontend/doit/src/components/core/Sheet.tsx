"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"
import { sheetVariants } from "@/utils/components/core/sheetUtils"
import { VariantProps } from "class-variance-authority"

/**
 * The portal for rendering the sheet content into a separate DOM node.
 */
const SheetPortal = SheetPrimitive.Portal

/**
 * Overlay that appears behind the sheet content when the sheet is open.
 *
 * This component creates a semi-transparent black background that covers the screen.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>} props - The properties passed to the SheetOverlay component.
 * @param {React.Ref} ref - A ref passed to the overlay element.
 * @returns {JSX.Element} The rendered SheetOverlay component.
 */
const SheetOverlay = React.forwardRef<
    ComponentRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
        ref={ref}
    />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/**
 * The content of the sheet, displayed when the sheet is open.
 *
 * This component handles the display and styling of the sheet based on the passed side prop (left or right).
 *
 * @param {SheetContentProps} props - The properties passed to the SheetContent component.
 * @param {React.Ref} ref - A ref passed to the content element.
 * @returns {JSX.Element} The rendered SheetContent component.
 */
interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
    ComponentRef<typeof SheetPrimitive.Content>,
    SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
            ref={ref}
            className={cn(sheetVariants({ side }), className)}
            {...props}
        >
            {children}
            <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
        </SheetPrimitive.Content>
    </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/**
 * Header section inside the sheet, used for displaying the title or other elements at the top.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties passed to the SheetHeader component.
 * @param className - The additional styles for the SheetHeader component.
 *
 * @returns The rendered SheetHeader component.
 */
const SheetHeader = ({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
SheetHeader.displayName = "SheetHeader"

/**
 * Footer section inside the sheet, used for displaying action buttons or other elements at the bottom.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties passed to the SheetFooter component.
 * @param className - The additional styles for the SheetFooter component.
 * @returns The rendered SheetFooter component.
 */
const SheetFooter = ({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
SheetFooter.displayName = "SheetFooter"

/**
 * Title element inside the sheet, typically used for the sheet's heading.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>} props - The properties passed to the SheetTitle component.
 * @param {React.Ref} ref - A ref passed to the title element.
 * @returns {JSX.Element} The rendered SheetTitle component.
 */
const SheetTitle = React.forwardRef<
    ComponentRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

/**
 * Description element inside the sheet, typically used for providing additional details or information.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>} props - The properties passed to the SheetDescription component.
 * @param {React.Ref} ref - A ref passed to the description element.
 * @returns {JSX.Element} The rendered SheetDescription component.
 */
const SheetDescription = React.forwardRef<
    ComponentRef<typeof SheetPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
    SheetPortal,
    SheetOverlay,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
}