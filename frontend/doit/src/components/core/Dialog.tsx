"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

/**
 * DialogOverlay component wraps the Radix Overlay and applies custom styling for the overlay background.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>} props - The properties for the DialogOverlay component.
 * @returns JSX.Element The rendered DialogOverlay component.
 */
const DialogOverlay = React.forwardRef<
    ComponentRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * DialogContent component wraps the Radix Content and applies custom styling for the dialog content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>} props - The properties for the DialogContent component.
 * @param {React.ReactNode} children - The content inside the DialogContent.
 * @returns JSX.Element The rendered DialogContent component.
 */
const DialogContent = React.forwardRef<
    ComponentRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[24px]",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * DialogHeader component wraps the dialog header with custom styling.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the DialogHeader component.
 * @param className - The additional styles for the DialogHeader component.
 *
 * @returns JSX.Element The rendered DialogHeader component.
 */
const DialogHeader = ({
                          className,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

/**
 * DialogFooter component wraps the dialog footer with custom styling.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the DialogFooter component.
 * @param className - The additional styles for the DialogFooter component.
 *
 * @returns JSX.Element The rendered DialogFooter component.
 */
const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

/**
 * DialogTitle component wraps the Radix Title and applies custom styling for the dialog title.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>} props - The properties for the DialogTitle component.
 * @returns JSX.Element The rendered DialogTitle component.
 */
const DialogTitle = React.forwardRef<
    ComponentRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * DialogDescription component wraps the Radix Description and applies custom styling for the dialog description.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>} props - The properties for the DialogDescription component.
 * @returns JSX.Element The rendered DialogDescription component.
 */
const DialogDescription = React.forwardRef<
    ComponentRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
