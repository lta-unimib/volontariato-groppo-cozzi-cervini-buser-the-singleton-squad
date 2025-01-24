"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/utils/cnUtils"
import { ComponentRef } from "react"

/**
 * Command component that wraps the `CommandPrimitive` and styles it.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive>} props - The properties for the Command component.
 *
 * @returns JSX.Element The rendered Command component.
 */
const Command = React.forwardRef<
    ComponentRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
            className
        )}
        {...props}
    />
))
Command.displayName = CommandPrimitive.displayName

/**
 * CommandInput component that wraps the `CommandPrimitive.Input` with search icon.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>} props - The properties for the CommandInput component.
 *
 * @returns JSX.Element The rendered CommandInput component.
 */
const CommandInput = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

/**
 * CommandList component that wraps the `CommandPrimitive.List` for rendering a scrollable list of items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>} props - The properties for the CommandList component.
 *
 * @returns JSX.Element The rendered CommandList component.
 */
const CommandList = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
        {...props}
    />
))
CommandList.displayName = CommandPrimitive.List.displayName

/**
 * CommandEmpty component that wraps the `CommandPrimitive.Empty` for displaying an empty state.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>} props - The properties for the CommandEmpty component.
 *
 * @returns JSX.Element The rendered CommandEmpty component.
 */
const CommandEmpty = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

/**
 * CommandGroup component that wraps the `CommandPrimitive.Group` to group related items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>} props - The properties for the CommandGroup component.
 *
 * @returns JSX.Element The rendered CommandGroup component.
 */
const CommandGroup = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
            className
        )}
        {...props}
    />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

/**
 * CommandSeparator component that wraps the `CommandPrimitive.Separator` to create a visual separator between items.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>} props - The properties for the CommandSeparator component.
 *
 * @returns JSX.Element The rendered CommandSeparator component.
 */
const CommandSeparator = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 h-px bg-border", className)}
        {...props}
    />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

/**
 * CommandItem component that wraps the `CommandPrimitive.Item` to display each individual item in the command list.
 *
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>} props - The properties for the CommandItem component.
 *
 * @returns JSX.Element The rendered CommandItem component.
 */
const CommandItem = React.forwardRef<
    ComponentRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            className
        )}
        {...props}
    />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

/**
 * CommandShortcut component that renders a shortcut label next to a command item.
 *
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - The properties for the CommandShortcut component.
 * @param className - The additional styles for the CommandShortcut component.
 *
 * @returns JSX.Element The rendered CommandShortcut component.
 */
const CommandShortcut = ({
                             className,
                             ...props
                         }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}
CommandShortcut.displayName = "CommandShortcut"

export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
}
