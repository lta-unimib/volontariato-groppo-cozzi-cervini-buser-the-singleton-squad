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
 * Component for displaying an organization's profile.
 * It fetches and renders profile data, showing a loading indicator while fetching.
 *
 * @returns The OrganizationProfile component.
 */
export default function OrganizationProfile() {
    const { profileData: organizationProfile, loading, error } = useProfileData<OrganizationFormData>("/profile/organization/");

    /**
     * Renders the appropriate content based on loading, error, or available profile data.
     *
     * @returnsThe JSX content to be displayed.
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

        return (
            <OrganizationProfileContent
                organizationProfile={organizationProfile}
                formatWebsiteUrl={formatWebsiteUrl}
                readOnly={false}
            />
        );
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full h-screen flex flex-col">
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

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}