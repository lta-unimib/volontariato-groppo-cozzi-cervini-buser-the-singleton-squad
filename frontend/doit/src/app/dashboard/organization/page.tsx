"use client";

import {organizationMenuItems} from "@/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import {Page} from "@/components/layout/Page";

export default function Home() {
    return (
        <Page>
            <SidebarLayout menuItems={organizationMenuItems} header={""} side={"left"} variant={"floating"}
                           collapsible={"icon"}>
                <div>
                    {/*put here some children content to be displayed side by side with the sidebar*/}
                </div>
            </SidebarLayout>
        </Page>

    );
}
