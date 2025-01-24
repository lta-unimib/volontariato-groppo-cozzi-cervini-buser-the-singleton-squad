"use client"

import React from "react";
import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useProfileData } from "@/hooks/useProfileData";
import { formatWebsiteUrl } from "@/utils/urlUtils";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import {OrganizationProfileContent} from "@/components/OrganizationProfileContent";

/**
 * Main component to display the organization profile.
 * @returns The rendered OrganizationProfile component.
 */
export default function OrganizationProfile() {
    const { profileData: organizationProfile, loading, error } = useProfileData<OrganizationFormData>("/profile/organization/");

    const categories = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    /**
     * Function to render the content of the profile.
     * Displays a loading spinner, an error message, or the profile content based on the current state.
     * @returns The content to render.
     */
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

        return <OrganizationProfileContent organizationProfile={organizationProfile} categories={categories} formatWebsiteUrl={formatWebsiteUrl} />;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className={`w-full h-screen flex flex-col`}>
                <div className="flex w-full min-h-screen">
                    {/* Sidebar */}
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

                    {/* Profile Content */}
                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}