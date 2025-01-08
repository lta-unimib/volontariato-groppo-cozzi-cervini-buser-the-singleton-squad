"use client";

import {menuItems} from "@/app/dashboard/volunteer/utils/MenuItems";
import SidebarLayout from "@/app/dashboard/volunteer/components/SidebarLayout";

export default function Home() {
    return (
        <SidebarLayout menuItems={menuItems} header="Volontario">
            <div></div>
        </SidebarLayout>
    );
}
