"use client";

import { Page } from "@/components/layout/Page";
import { volunteerMenuItems } from "@/app/dashboard/volunteer/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import RequestCard from "@/components/ui/RequestCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { request } from "@/app/request/utils/cardUtils";

export default function Home() {
    return (
        <Page>
            <div className="flex w-full h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={volunteerMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="flex-1 my-4">
                    <ScrollArea className="h-full px-8">
                        <div className="space-y-2">
                            {request.map((card, i) => (
                                <RequestCard
                                    key={i}
                                    organization={card.organization}
                                    description={card.description}
                                    location={card.location}
                                    date={card.date}
                                    image={card.image}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Page>
    );
}