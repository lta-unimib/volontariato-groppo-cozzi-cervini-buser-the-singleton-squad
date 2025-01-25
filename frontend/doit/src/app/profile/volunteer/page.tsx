"use client"

import React, { useState, useMemo } from "react";
import { volunteerMenuItems } from "@/utils/components/sidebar/volunteerMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useProfileData } from "@/hooks/useProfileData";
import { getSelectedDays } from "@/utils/availabilityUtils";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { VolunteerProfileContent } from "@/components/VolunteerProfileContent";

/**
 * Main component to display the volunteer profile.
 * @returns The rendered VolunteerProfile component.
 */
export default function VolunteerProfile() {
    const [date] = useState<Date | undefined>(new Date());
    const { profileData: volunteerProfile, loading, error } = useProfileData<VolunteerFormData>("/profile/volunteer/");

    /**
     * Memoized calculation of selected days based on the volunteer's availability and the current date.
     * @returns An array of selected dates corresponding to the volunteer's availability.
     */
    const selectedDays = useMemo(() => {
        return date && volunteerProfile?.availability
            ? getSelectedDays(volunteerProfile.availability, date)
            : [];
    }, [date, volunteerProfile]);

    /**
     * Determines if the volunteer is available on the current date.
     */
    const isAvailable = selectedDays.some((d) => d.toDateString() === new Date().toDateString());

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

        if (error || !volunteerProfile) {
            return (
                <div className="flex items-center justify-center h-full">
                    {error || "Failed to load user profile"}
                </div>
            );
        }

        return <VolunteerProfileContent volunteerProfile={volunteerProfile} selectedDays={selectedDays} isAvailable={isAvailable} readOnly={false} />;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className={`w-full h-screen flex flex-col`}>
                <div className="flex w-full min-h-screen">
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

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}