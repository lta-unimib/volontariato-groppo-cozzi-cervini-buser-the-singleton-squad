"use client";

import {Page} from "@/components/layout/Page";
import {organizationMenuItems} from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import {ScrollArea} from "@/components/ui/ScrollArea";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <Page>

                <div className="flex w-full min-h-screen">
                    <div className="w-[var(--sidebar-width)]">
                        <SidebarLayout menuItems={organizationMenuItems} header={""} side={"left"} variant={"floating"}
                                       collapsible={"icon"}>
                            <div/>
                        </SidebarLayout>
                    </div>

                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        <ScrollArea className="flex-1 px-4 md:px-8">
                        </ScrollArea>
                    </div>
                </div>
            </Page>
        </div>
    );
}

// Nome, Cognome, Email, Disponibilità, Città, Categoria, Descrizione, Immagine