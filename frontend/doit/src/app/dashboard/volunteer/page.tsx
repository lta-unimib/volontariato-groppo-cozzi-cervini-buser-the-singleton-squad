"use client";

import {menuItems} from "@/app/dashboard/volunteer/utils/MenuItems";
import SidebarLayout from "@/app/dashboard/volunteer/components/SidebarLayout";
import {Page} from "@/components/layout/Page";

export default function Home() {
    return (
        <Page>
            <SidebarLayout menuItems={menuItems} header={""}>
                <div></div>
            </SidebarLayout>
        </Page>

    );
}
