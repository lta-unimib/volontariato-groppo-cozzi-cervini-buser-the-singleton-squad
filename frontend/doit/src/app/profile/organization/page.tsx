"use client"

import React, { useState, useEffect } from "react";
import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Card, CardContent } from "@/components/core/Card";
import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import {ApiResponse} from "@/types/request";
import {ProfileContentProps} from "@/types/props/header/profileContentProps";

const ProfileContent: React.FC<ProfileContentProps> = ({ organizationProfile, categories, formatWebsiteUrl }) => (
    <>
        <div className="p-4 md:px-8">
            <ProfileHeader
                name={organizationProfile.organizationName}
                role={organizationProfile.role ?? "Organization"}
                city={organizationProfile.city}
                imageUrl="/placeholder.jpg"
                profileData={organizationProfile}
            />
        </div>

        <ScrollArea className="flex-1 p-4 md:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground">About</h3>
                            <p className="text-sm text-muted-foreground mt-2">{organizationProfile.description}</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Interest</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories
                                    .filter(category => organizationProfile.preferences.includes(category.id))
                                    .map(category => (
                                        <Badge key={category.id} variant="secondary" className="font-normal">
                                            {category.label}
                                        </Badge>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                            <ul className="text-sm text-muted-foreground mt-2">
                                <li>Email: <a href={`mailto:${organizationProfile.email}`}>{organizationProfile.email}</a></li>
                                <li>
                                    Website: <a href={formatWebsiteUrl(organizationProfile.website ?? "")} target="_blank" rel="noopener noreferrer">
                                    {organizationProfile.website}
                                </a>
                                </li>
                                <li>VAT Number: {organizationProfile.VATNumber}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    </>
);

export default function OrganizationProfile() {
    const [organizationProfile, setOrganizationProfile] = useState<OrganizationFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>("/profile/organization/");

                if (response.status === 200 && response.data) {
                    setOrganizationProfile(response.data as unknown as OrganizationFormData);
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

    const renderProfileContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
                </div>
            );
        }

        if (error || !organizationProfile) {
            return (
                <div className="flex items-center justify-center h-full">
                    {error || "Failed to load organization profile"}
                </div>
            );
        }

        return <ProfileContent organizationProfile={organizationProfile} categories={categories} formatWebsiteUrl={formatWebsiteUrl} />;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="flex w-full min-h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={organizationMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="flex-1 flex flex-col pb-28 md:pb-4">
                    {renderProfileContent()}
                </div>
            </div>
        </div>
    );
}
