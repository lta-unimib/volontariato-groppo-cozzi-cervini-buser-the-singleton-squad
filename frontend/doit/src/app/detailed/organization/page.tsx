"use client"

import React from "react";
import { formatWebsiteUrl } from "@/utils/urlUtils";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import {OrganizationProfileContent} from "@/components/OrganizationProfileContent";
import {useSearchParams} from "next/navigation";

export default function OrganizationProfile() {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get("data");

    const organizationProfile = React.useMemo(() => {
        if (!encodedData) return null;
        try {
            return JSON.parse(decodeURIComponent(encodedData)) as OrganizationFormData;
        } catch {
            return null;
        }
    }, [encodedData]);

    if (!organizationProfile) {
        return <div>Nessun dato disponibile</div>;
    }

    const renderProfileContent = () => {

        return (
            <OrganizationProfileContent
                organizationProfile={organizationProfile}
                formatWebsiteUrl={formatWebsiteUrl}
                readOnly={true}
            />
        );
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full h-screen flex flex-col">
                <div className="flex w-full min-h-screen">

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col pb-28 md:pb-4">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}