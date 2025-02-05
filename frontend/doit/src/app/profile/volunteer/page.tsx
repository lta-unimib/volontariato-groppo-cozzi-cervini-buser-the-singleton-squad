"use client";

import React, { useState, useMemo } from "react";
import { volunteerMenuItems } from "@/utils/components/sidebar/volunteerMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { useProfileData } from "@/hooks/useProfileData";
import { getSelectedDays } from "@/utils/availabilityUtils";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { VolunteerProfileContent } from "@/components/VolunteerProfileContent";
import { Skeleton } from "@/components/sidebar/Skeleton";

export default function VolunteerProfile() {
    const [date] = useState<Date | undefined>(new Date());
    const { profileData: volunteerProfile, loading, error } = useProfileData<VolunteerFormData>("/profile/volunteer/");

    const selectedDays = useMemo(() => {
        return date && volunteerProfile?.availability
            ? getSelectedDays(volunteerProfile.availability, date)
            : [];
    }, [date, volunteerProfile]);

    const isAvailable = selectedDays.some((d) => d.toDateString() === new Date().toDateString());

    const renderProfileContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col lg:flex-row w-full animate-pulse">
                    <div className="w-full h-screen flex flex-col p-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-24 h-24 rounded-full" />
                            <div className="flex flex-col">
                                <Skeleton className="h-6 w-40 rounded-md" />
                                <Skeleton className="h-4 w-28 mt-2 rounded-md" />
                                <Skeleton className="h-4 w-32 mt-1 rounded-md" />
                            </div>
                            <div className="ml-auto flex gap-2">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="w-24 h-10 rounded-md" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                <Skeleton className="h-20 w-full rounded-lg" />
                                <Skeleton className="h-20 w-full rounded-lg" />
                                <Skeleton className="h-20 w-full rounded-lg" />
                            </div>

                            <Skeleton className="h-72 w-full rounded-lg" />
                        </div>
                    </div>
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

                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}