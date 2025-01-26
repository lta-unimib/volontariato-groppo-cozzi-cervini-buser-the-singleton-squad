import { cva } from "class-variance-authority";

/**
 * Sidebar menu button variants using `class-variance-authority` (CVA).
 * Defines various styles for the sidebar button, including hover states, sizes, and other interactions.
 */
const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-full p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding,background-color] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 md:w-auto w-16",
    {
        variants: {
            /**
             * Button variant styles, including default and outline variants.
             */
            variant: {
                /**
                 * Default variant with hover and active states.
                 */
                default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:shadow-sm",

                /**
                 * Outline variant with a background, border shadow, and hover effects.
                 */
                outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
            /**
             * Button size options.
             */
            size: {
                /**
                 * Default size with medium height and text size.
                 */
                default: "h-9 text-sm",

                /**
                 * Small size with a smaller height and text size.
                 */
                sm: "h-8 text-xs",

                /**
                 * Large size with a larger height and custom padding for collapsible icon menus.
                 */
                lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
            },
        },
        /**
         * Default variants set to `default` for both variant and size.
         */
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export { sidebarMenuButtonVariants };