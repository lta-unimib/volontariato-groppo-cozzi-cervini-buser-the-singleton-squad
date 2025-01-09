"use client";

import {Page} from "@/components/layout/Page";
import {menuItems} from "@/app/dashboard/organization/utils/menuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import OfferCard from "@/app/dashboard/volunteer/components/OfferCard";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div>
                <Page>
                    <SidebarLayout menuItems={menuItems} header={""} side={"left"} variant={"floating"}
                                         collapsible={"icon"}>
                        <div/>
                    </SidebarLayout>
                </Page>
            </div>

            <div className="py-4">
                <Page>
                    <OfferCard organization="Gruppo ALBORA"
                               description="Cerchiamo coordinatrice per: casa GRAZIA"
                               location="Mori"
                               date="2/12/2024 - 31/12/2025"
                               image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                        />
                </Page>
            </div>
        </div>
    );
}