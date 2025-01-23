"use client";

import {organizationMenuItems} from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";

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