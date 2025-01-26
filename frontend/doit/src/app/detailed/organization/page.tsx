"use client";

import React, { Suspense } from "react";
import { formatWebsiteUrl } from "@/utils/urlUtils";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { OrganizationProfileContent } from "@/components/OrganizationProfileContent";
import { useSearchParams } from "next/navigation";

function OrganizationProfileInner() {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get("data");

    const [organizationProfile, setOrganizationProfile] = React.useState<OrganizationFormData | null>(null);

    React.useEffect(() => {
        if (!encodedData) return;
        try {
            const parsedData = JSON.parse(decodeURIComponent(encodedData)) as OrganizationFormData;
            setOrganizationProfile(parsedData);
        } catch {
            setOrganizationProfile(null);
        }
    }, [encodedData]);

    if (!organizationProfile) {
        return <div>Nessun dato disponibile</div>;
    }

    return (
        <OrganizationProfileContent
            organizationProfile={organizationProfile}
            formatWebsiteUrl={formatWebsiteUrl}
            readOnly={true}
        />
    );
}

export default function OrganizationProfile() {
    return (
        <Suspense fallback={<div>Caricamento in corso...</div>}>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="w-full h-screen flex flex-col">
                    <div className="flex w-full min-h-screen">
                        <div className="flex-1 flex flex-col pb-28 md:pb-4">
                            <OrganizationProfileInner />
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}