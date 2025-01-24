"use client";

import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";

/**
 * Component for displaying the organization reviews page.
 * It uses a sidebar layout and the `organizationMenuItems` for the sidebar content.
 * The sidebar is positioned on the left and uses a floating, collapsible style with icons.
 *
 * @returns The OrganizationReviews component.
 */
export default function OrganizationReviews() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            {/* Sidebar layout with menu items and a floating, collapsible sidebar */}
            <SidebarLayout
                menuItems={organizationMenuItems}
                header={""}  // No header for the sidebar
                side={"left"}  // Sidebar positioned on the left
                variant={"floating"}  // Floating sidebar style
                collapsible={"icon"}  // Collapsible sidebar with icon-only menu items
            >
                <div />
            </SidebarLayout>
        </div>
    );
}
