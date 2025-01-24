"use client";

import {organizationMenuItems} from "@/utils/components/sidebar/organizationMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";

export default function OrganizationReviews() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <SidebarLayout menuItems={organizationMenuItems} header={""} side={"left"} variant={"floating"}
                           collapsible={"icon"}>
                <div/>
            </SidebarLayout>
        </div>
    );
}