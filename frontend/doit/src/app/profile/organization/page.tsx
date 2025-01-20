"use client"

import React, { useState, useEffect } from "react";
import { Page } from "@/components/layout/Page";
import { organizationMenuItems } from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Card, CardContent } from "@/components/ui/Card";
import { ProfileHeader } from "@/components/layout/ProfileHeader";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { makeGetRequest } from "@/utils/apiUtils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { OrganizationFormData } from "@/types/formData";

interface OrganizationApiResponse {
    status: number;
    data: OrganizationFormData;
}

export default function Home() {
    const [organizationProfile, setOrganizationProfile] = useState<OrganizationFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<OrganizationApiResponse>("/profile/organization/");

                if (response.status === 200 && response.data) {
                    setOrganizationProfile(response.data.data);
                } else {
                    setError("Failed to fetch organization profile");
                }
            } catch (error) {
                console.error("Error fetching organization profile:", error);
                setError("An error occurred while fetching organization profile");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const formatWebsiteUrl = (url: string) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row w-full">
                <Page>
                    <div className="flex w-full min-h-screen items-center justify-center">
                        <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
                    </div>
                </Page>
            </div>
        );
    }

    if (error || !organizationProfile) {
        return (
            <div className="flex flex-col lg:flex-row w-full">
                <Page>
                    <div className="flex w-full min-h-screen items-center justify-center">
                        {error || "Failed to load organization profile"}
                    </div>
                </Page>
            </div>
        );
    }

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
                                role={organizationProfile.role ?? "Organization"}
                                city={organizationProfile.city}
                                imageUrl="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                            />
                        </div>

                        <ScrollArea className="flex-1 p-4 md:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4 lg:space-y-4">
                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">About</h3>
                                            <p className="text-sm text-muted-foreground mt-2">{organizationProfile.description}</p>
                                        </CardContent>
                                    </Card>

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

                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                                            <ul className="text-sm text-muted-foreground mt-2">
                                                <li>Email: <a href={`mailto:${organizationProfile.email}`}>{organizationProfile.email}</a></li>
                                                <li>
                                                    Website: <a href={formatWebsiteUrl(organizationProfile.webSite ?? "")} target="_blank" rel="noopener noreferrer">
                                                    {organizationProfile.webSite}
                                                </a>
                                                </li>
                                                <li>VAT Number: {organizationProfile.VATNumber}</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="space-y-4">
                                    {/* Additional section for future features */}
                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">Organization Statistics</h3>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                This section will display organization statistics and metrics.
                                            </p>
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