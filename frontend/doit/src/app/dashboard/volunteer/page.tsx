"use client";

import {Page} from "@/components/layout/Page";
import {volunteerMenuItems} from "@/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import OfferCard from "@/app/dashboard/volunteer/components/OfferCard";
import {ScrollArea} from "@/components/ui/ScrollArea";
import {Hero} from "@/components/ui/Hero";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div>
                <Page>
                    <SidebarLayout menuItems={volunteerMenuItems} header={""} side={"left"} variant={"floating"}
                                   collapsible={"icon"}>
                        <div/>
                    </SidebarLayout>
                </Page>
            </div>
            <div className="w-full">
                <Page>
                    <ScrollArea className="mt-4 px-8">
                        <OfferCard organization="Gruppo ALBORA"
                                   description="Cerchiamo coordinatrice per: casa GRAZIA"
                                   location="Mori"
                                   date="2/12/2024 - 31/12/2025"
                                   image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                        />
                    </ScrollArea>
                </Page>
            </div>
        </div>
    );
}