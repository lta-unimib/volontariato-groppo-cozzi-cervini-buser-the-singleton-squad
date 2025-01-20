"use client"

import React from "react";
import { Page } from "@/components/layout/Page";
import { organizationMenuItems } from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Card, CardContent } from "@/components/ui/Card";
import { ProfileHeader } from "@/components/layout/ProfileHeader";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";

interface OrganizationProfile {
    organizationName: string;
    email: string;
    password: string;
    city: string;
    preferences: string[];
    description: string;
    VATNumber: string;
    webSite: string;
    role: string;
}

export default function Home() {
    const organizationProfile: OrganizationProfile = {
        organizationName: "DoIT",
        email: "buserdaniele@gmail.com",
        password: "$2a$10$jCBoYZ17Eas.RMvRFUaEmO2/ZDBRErBTY387rMXaReDWm's/60I0e",
        city: "Bovisio-Masciago",
        preferences: ["supporto_anziani"],
        description: "Descrizione",
        VATNumber: "IT090932423143",
        webSite: "www.danielebuser.com",
        role: "organization"
    };

    // Function to format website URL
    const formatWebsiteUrl = (url: string) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <Page>
                <div className="flex w-full min-h-screen">
                    <div className="w-[var(--sidebar-width)]">
                        <SidebarLayout menuItems={organizationMenuItems} header={""} side={"left"} variant={"floating"} collapsible={"icon"}>
                            <div />
                        </SidebarLayout>
                    </div>

                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        <div className="p-4 md:px-8">
                            <ProfileHeader
                                name={organizationProfile.organizationName}
                                role={organizationProfile.role}
                                city={organizationProfile.city}
                                imageUrl="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                        </div>

                        <ScrollArea className="flex-1 p-4 md:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4 lg:space-y-4 order-1 lg:order-1">
                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">About</h3>
                                            <p className="text-sm text-muted-foreground mt-2">{organizationProfile.description}</p>
                                        </CardContent>
                                    </Card>

                                    <div className="block lg:hidden">
                                        <Card className="rounded-2xl">
                                            <CardContent className="pt-6">
                                                <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Interest</h3>
                                                <div className="text-sm text-muted-foreground mb-4">
                                                    <RoundCheckboxSelector
                                                        initialSelected={organizationProfile.preferences}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                                            <ul className="text-sm text-muted-foreground mt-2">
                                                <li>Email: <a href={`mailto:${organizationProfile.email}`}>{organizationProfile.email}</a></li>
                                                <li>Website: <a href={formatWebsiteUrl(organizationProfile.webSite)} target="_blank" rel="noopener noreferrer">{organizationProfile.webSite}</a></li>
                                                <li>VAT Number: {organizationProfile.VATNumber}</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="hidden lg:block order-2">
                                    <Card className="rounded-2xl h-fit">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Interest</h3>
                                            <div className="text-sm text-muted-foreground mb-4">
                                                <RoundCheckboxSelector
                                                    initialSelected={organizationProfile.preferences}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </Page>
        </div>
    );
}