"use client"

import React, { useState, useMemo } from "react";
import { getSelectedDays } from "@/utils/availabilityUtils";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { VolunteerProfileContent } from "@/components/VolunteerProfileContent";
import {useSearchParams} from "next/navigation";

export default function VolunteerProfile() {
    const [date] = useState<Date | undefined>(new Date());
    const searchParams = useSearchParams();
    const encodedData = searchParams.get("data");

    const volunteerProfile = React.useMemo(() => {
        if (!encodedData) return null;
        try {
            return JSON.parse(decodeURIComponent(encodedData)) as VolunteerFormData;
        } catch {
            return null;
        }
    }, [encodedData]);

    if (!volunteerProfile) {
        return <div>Nessun dato disponibile</div>;
    }

    const selectedDays = useMemo(() => {
        return date && volunteerProfile?.availability
            ? getSelectedDays(volunteerProfile.availability, date)
            : [];
    }, [date, volunteerProfile]);

    const isAvailable = selectedDays.some((d) => d.toDateString() === new Date().toDateString());

    const renderProfileContent = () => {
        return <VolunteerProfileContent volunteerProfile={volunteerProfile} readOnly={true} selectedDays={selectedDays} isAvailable={isAvailable} />;
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className={`w-full h-screen flex flex-col`}>
                <div className="flex w-full min-h-screen">

                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}