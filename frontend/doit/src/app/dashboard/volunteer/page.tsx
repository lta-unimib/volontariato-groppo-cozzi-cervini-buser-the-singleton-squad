"use client";

import {menuItems} from "@/app/dashboard/volunteer/utils/MenuItems";
import SidebarLayout from "@/app/components/ui/SidebarLayout";
import {Page} from "@/components/layout/Page";

export default function Home() {
    return (
        <Page>
            <SidebarLayout menuItems={menuItems} header={""} side={"left"} variant={"floating"}
                           collapsible={"icon"}>
                <div>
                    {/*put here some children content to be displayed side by side with the sidebar*/}
                </div>
            </SidebarLayout>
        </Page>

    );
}
