"use client";

import React, { Suspense } from "react";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Card, CardContent } from "@/components/core/Card";
import { useSearchParams } from "next/navigation";
import {DetailedOrganizationData } from "@/types/request";
import {OrganizationHeader} from "@/components/header/OrganizationHeader";

const AboutSection: React.FC<{ description: string }> = ({ description }) => (
    <Card className="rounded-2xl">
        <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-foreground">Informazioni</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
    </Card>
);

const ContactInfoSection: React.FC<{ organization: DetailedOrganizationData }> = ({ organization }) => {
    const formatWebsiteUrl = (url: string) =>
        url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

    return (
        <Card className="rounded-2xl">
            <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-foreground">Informazioni di Contatto</h3>
                <ul className="text-sm text-muted-foreground mt-2">
                    <li>Email: <a href={`mailto:${organization.email}`}>{organization.email}</a></li>
                    <li>
                        Sito Web: <a href={formatWebsiteUrl(organization.website ?? "")} target="_blank" rel="noopener noreferrer">
                        {organization.website}
                    </a>
                    </li>
                    <li>Partita IVA: {organization.VATNumber}</li>
                </ul>
            </CardContent>
        </Card>
    );
};

const DetailedRequestContent = () => {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get("data");

    const organizationData = React.useMemo(() => {
        if (!encodedData) return null;
        try {
            return JSON.parse(decodeURIComponent(encodedData)) as DetailedOrganizationData;
        } catch {
            return null;
        }
    }, [encodedData]);

    console.log(organizationData);

    if (!organizationData) {
        return <div>Nessun dato disponibile</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full h-screen flex flex-col">
                <div className="flex w-full min-h-screen">
                    <div className="flex-1 flex flex-col pb-12 md:pb-4">
                        <div className="p-4 md:px-8">
                            <OrganizationHeader
                                organizationName={organizationData.organizationName}
                                city={`${organizationData.city}`}
                                imageUrl="/placeholder.jpg"
                                organizationData={organizationData}
                                role={organizationData.role}
                            />
                        </div>

                        <ScrollArea className="flex-1 p-4 md:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <AboutSection description={organizationData.description} />
                                    <ContactInfoSection organization={organizationData} />
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function DetailedRequest() {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <DetailedRequestContent />
        </Suspense>
    );
}