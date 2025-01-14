"use client";

import {Page} from "@/components/layout/Page";
import {organizationMenuItems} from "@/app/dashboard/volunteer/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <Page>
                <SidebarLayout menuItems={organizationMenuItems} header={""} side={"left"} variant={"floating"}
                               collapsible={"icon"}>
                    <div/>
                </SidebarLayout>
            </Page>
        </div>
    );
}