"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

/**
 * A collection of components for creating a select input using Radix UI's SelectPrimitive.
 *
 * These components provide a customizable select dropdown with trigger, content, items, and scroll buttons.
 */
const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

/**
 * The trigger button for the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>} props - The properties passed to the SelectTrigger component.
 * @param {React.Ref} ref - A ref passed to the trigger button element.
 * @returns {JSX.Element} The rendered SelectTrigger component.
 */
const SelectTrigger = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Scroll up button inside the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>} props - The properties passed to the SelectScrollUpButton component.
 * @param {React.Ref} ref - A ref passed to the scroll up button element.
 * @returns {JSX.Element} The rendered SelectScrollUpButton component.
 */
const SelectScrollUpButton = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * Scroll down button inside the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>} props - The properties passed to the SelectScrollDownButton component.
 * @param {React.Ref} ref - A ref passed to the scroll down button element.
 * @returns {JSX.Element} The rendered SelectScrollDownButton component.
 */
const SelectScrollDownButton = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/**
 * The content container for the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>} props - The properties passed to the SelectContent component.
 * @param {React.Ref} ref - A ref passed to the content element.
 * @returns {JSX.Element} The rendered SelectContent component.
 */
const SelectContent = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    "p-1",
                    position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * Label for the select input.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>} props - The properties passed to the SelectLabel component.
 * @param {React.Ref} ref - A ref passed to the label element.
 * @returns {JSX.Element} The rendered SelectLabel component.
 */
const SelectLabel = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
        {...props}
    />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * Item in the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>} props - The properties passed to the SelectItem component.
 * @param {React.Ref} ref - A ref passed to the item element.
 * @returns {JSX.Element} The rendered SelectItem component.
 */
const SelectItem = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * Separator between items in the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>} props - The properties passed to the SelectSeparator component.
 * @param {React.Ref} ref - A ref passed to the separator element.
 * @returns {JSX.Element} The rendered SelectSeparator component.
 */
const SelectSeparator = React.forwardRef<
    ComponentRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
