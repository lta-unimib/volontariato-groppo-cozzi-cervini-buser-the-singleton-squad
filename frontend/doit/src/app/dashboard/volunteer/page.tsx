"use client";

import { Page } from "@/components/layout/Page";
import { volunteerMenuItems } from "@/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import OfferCard from "@/app/dashboard/volunteer/components/OfferCard";
import { ScrollArea } from "@/components/ui/ScrollArea";

export default function Home() {
    return (
        <Page>
            <div className="flex w-full h-screen">
                {/* Sidebar */}
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

                {/* Scroll Area */}
                <div className="flex-1 my-4">
                    <ScrollArea className="h-full px-8">
                        <div className="space-y-2">
                            <OfferCard
                                organization="Gruppo ALBORA"
                                description="Cerchiamo coordinatrice per: casa GRAZIA"
                                location="Mori"
                                date="2/12/2024 - 31/12/2025"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Associazione XYZ"
                                description="Cerchiamo volontari per: rifugio per animali"
                                location="Trento"
                                date="1/05/2024 - 1/05/2025"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Onlus ABC"
                                description="Aiuto richiesto per: cucina comunitaria"
                                location="Verona"
                                date="15/02/2024 - 15/06/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Volontariato Verde"
                                description="Cerchiamo giardinieri per: manutenzione parchi"
                                location="Bolzano"
                                date="20/03/2024 - 20/11/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Rete Sociale"
                                description="Volontari per: supporto anziani"
                                location="Padova"
                                date="1/06/2024 - 31/12/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Cucina Solidale"
                                description="Aiuto richiesto per: preparazione pasti per senzatetto"
                                location="Milano"
                                date="1/04/2024 - 30/06/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Ambiente Verde"
                                description="Cerchiamo volontari per: pulizia spiagge"
                                location="Lido di Venezia"
                                date="5/07/2024 - 5/09/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                            <OfferCard
                                organization="Associazione Cuore"
                                description="Volontari per: supporto psicologico"
                                location="Roma"
                                date="1/02/2024 - 1/05/2024"
                                image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Page>
    );
}