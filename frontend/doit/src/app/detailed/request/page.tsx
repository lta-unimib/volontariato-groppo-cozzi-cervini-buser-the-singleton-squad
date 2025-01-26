"use client";

import React, { Suspense } from "react";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Calendar } from "@/components/form/availability/Calendar";
import { Card, CardContent } from "@/components/core/Card";
import { useSearchParams } from "next/navigation";
import { RequestHeader } from "@/components/header/RequestHeader";
import { DetailedRequestData } from "@/types/request";
import { dateUtils } from "@/utils/components/dateUtils";
import { formatWebsiteUrl } from "@/utils/urlUtils";
import { ReviewCardMock } from "@/components/review/ReviewCard";
import {EmailList} from "@/components/EmailList"; // Importa la ReviewCard

/**
 * `AboutSection` Component.
 *
 * Displays a section with the description of the request.
 *
 * @param description - The description text to be displayed.
 * @returns A card with the description of the request.
 */
const AboutSection: React.FC<{ description: string }> = ({ description }) => (
    <Card className="rounded-2xl">
        <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-foreground">Informazioni</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
    </Card>
);

/**
 * `ContactInfoSection` Component.
 *
 * Displays a section with the contact information of the organization.
 *
 * @param organization - The organization data to display.
 * @returns A card with the organization's contact information.
 */
const ContactInfoSection: React.FC<{ organization: DetailedRequestData["organization"] }> = ({ organization }) => {
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

/**
 * `DateSection` Component.
 *
 * Displays a section with the event start and end dates, and a calendar with the selected dates.
 *
 * @param startDate - The start date of the event.
 * @param endDate - The end date of the event.
 * @returns A card with the event dates and a calendar.
 */
const DateSection: React.FC<{ startDate: Date; endDate: Date }> = ({ startDate, endDate }) => {
    const selectedDates = dateUtils.getDateRange(startDate, endDate);

    return (
        <Card className="rounded-2xl">
            <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Date</h3>
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                        L'evento si svolgerà
                        dal {dateUtils.formatDate(startDate)} al {dateUtils.formatDate(endDate)}.
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

/**
 * `DetailedRequestContent` Component.
 *
 * This component fetches and displays the detailed information about a specific request.
 * It includes sections for about the request, contact info, event dates, and reviews.
 *
 * @returns A detailed view of the request with its related information.
 */
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
        return <div>Nessun dato disponibile</div>;
    }

    const [startDate, endDate] = requestData.timeRange.map((dateStr) => new Date(dateStr));

    // Aggiungi logica per controllare se la data di fine è prima di oggi
    const isEndTimePassed = endDate < new Date();

    console.log(requestData)

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
                                    {isEndTimePassed && <ReviewCardMock type="request" />} {/* Mostra le recensioni solo se la data di fine è passata */}
                                    {requestData.role === "volunteer" && <ContactInfoSection organization={requestData.organization} />}
                                    {requestData.role === "organization" && <EmailList idRequest={requestData.id as string} />}
                                </div>
                                <div className="space-y-4">
                                    <DateSection startDate={startDate} endDate={endDate} />
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * `DetailedRequest` Component.
 *
 * Suspense-based component for displaying the detailed request view.
 * It handles data fetching and shows the request content when ready.
 *
 * @returns The main detailed request component wrapped in Suspense.
 */
export default function DetailedRequest() {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <DetailedRequestContent />
        </Suspense>
    );
}
