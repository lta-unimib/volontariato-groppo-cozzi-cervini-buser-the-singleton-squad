"use client"

import React, { Suspense } from "react";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Calendar } from "@/components/form/availability/Calendar";
import { Card, CardContent } from "@/components/core/Card";
import { useSearchParams } from "next/navigation";
import { RequestHeader } from "@/components/header/RequestHeader";
import { DetailedRequestData } from "@/types/request";
import { dateUtils } from "@/utils/components/dateUtils";

const AboutSection: React.FC<{ description: string }> = ({ description }) => (
    <Card className="rounded-2xl">
        <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-foreground">About</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
    </Card>
);

const ContactInfoSection: React.FC<{ organization: DetailedRequestData["organization"] }> = ({ organization }) => {
    const formatWebsiteUrl = (url: string) =>
        url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

    return (
        <Card className="rounded-2xl">
            <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                <ul className="text-sm text-muted-foreground mt-2">
                    <li>Email: <a href={`mailto:${organization.email}`}>{organization.email}</a></li>
                    <li>
                        Website: <a href={formatWebsiteUrl(organization.website ?? "")} target="_blank" rel="noopener noreferrer">
                        {organization.website}
                    </a>
                    </li>
                    <li>VAT Number: {organization.VATNumber}</li>
                </ul>
            </CardContent>
        </Card>
    );
};

const DateSection: React.FC<{ startDate: Date; endDate: Date }> = ({ startDate, endDate }) => {
    const selectedDates = dateUtils.getDateRange(startDate, endDate);

    return (
        <Card className="rounded-2xl">
            <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Date</h3>
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                        L&#39;evento si svolgerà dal {dateUtils.formatDate(startDate)} al {dateUtils.formatDate(endDate)}.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Card className="rounded-2xl w-full flex items-center justify-center">
                        <CardContent className="flex pt-6 items-center justify-center">
                            <Calendar mode="multiple" selected={selectedDates} className="rounded-2xl p-4" />
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

const DetailedRequestContent = () => {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get("data");

    const requestData = React.useMemo(() => {
        if (!encodedData) return null;
        try {
            return JSON.parse(decodeURIComponent(encodedData)) as DetailedRequestData;
        } catch {
            return null;
        }
    }, [encodedData]);

    if (!requestData) {
        return <div>No data available</div>;
    }

    const [startDate, endDate] = requestData.timeRange.map((dateStr) => new Date(dateStr));

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full h-screen flex flex-col">
                <div className="flex w-full min-h-screen">
                    <div className="flex-1 flex flex-col pb-12 md:pb-4">
                        <div className="p-4 md:px-8">
                            <RequestHeader
                                title={requestData.title}
                                organizationName={requestData.organization.name}
                                address={`${requestData.address.street} ${requestData.address.number} ${requestData.address.additionalInfo}, ${requestData.address.city}`}
                                imageUrl="/placeholder.jpg"
                                requestData={requestData}
                                role={requestData.role}
                            />
                        </div>

                        <ScrollArea className="flex-1 p-4 md:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <AboutSection description={requestData.description} />
                                    {requestData.role === "volunteer" && <ContactInfoSection organization={requestData.organization} />}
                                </div>
                                <DateSection startDate={startDate} endDate={endDate} />
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
        <Suspense fallback={<div>Loading...</div>}>
            <DetailedRequestContent />
        </Suspense>
    );
}
