"use client"

import React from "react";
import { Page } from "@/components/Page";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Calendar } from "@/components/ui/date/Calendar";
import { Card, CardContent } from "@/components/ui/Card";
import { RequestHeader } from "@/components/ui/RequestPageHeader";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('data');
    const requestData = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;

    if (!requestData) {
        return <div>No data available</div>;
    }

    const formatWebsiteUrl = (url: string) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };

    const getDateRange = (startDate: Date, endDate: Date) => {
        const dates = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const [startDate, endDate] = requestData.timeRange.map((dateStr: string | number | Date) => new Date(dateStr));
    const selectedDates = getDateRange(startDate, endDate);

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <Page>
                <div className="flex w-full min-h-screen">
                    <div className="flex-1 flex flex-col pb-12 md:pb-4">
                        <div className="p-4 md:px-8">
                            <RequestHeader
                                title={`${requestData.title}`}
                                organizationName={`${requestData.organization.name}`}
                                address={`${requestData.address.street} ${requestData.address.number} ${requestData.address.additionalInfo}, ${requestData.address.city}`}
                                imageUrl="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                                requestData={requestData}
                                role={requestData.role}
                            />
                        </div>

                        <ScrollArea className="flex-1 p-4 md:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <Card className="rounded-2xl">
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-semibold text-foreground">About</h3>
                                            <p className="text-sm text-muted-foreground mt-2">{requestData.description}</p>
                                        </CardContent>
                                    </Card>

                                    {requestData.role === "volunteer" &&
                                        <Card className="rounded-2xl">
                                            <CardContent className="pt-6">
                                                <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                                                <ul className="text-sm text-muted-foreground mt-2">
                                                    <li>Email: <a href={`mailto:${requestData.organization.email}`}>{requestData.organization.email}</a></li>
                                                    <li>
                                                        Website: <a href={formatWebsiteUrl(requestData.organization.website ?? "")} target="_blank" rel="noopener noreferrer">
                                                        {requestData.organization.website}
                                                    </a>
                                                    </li>
                                                    <li>VAT Number: {requestData.organization.VATNumber}</li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    }
                                </div>
                                <Card className="rounded-2xl">
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold text-foreground mb-4">Date</h3>
                                        <div className="mb-4">
                                            <p className="text-sm text-muted-foreground">
                                                L'evento si svolgerà dal {formatDate(startDate)} al {formatDate(endDate)}.
                                            </p>
                                        </div>
                                        <div className="flex justify-center">
                                            <Card className="rounded-2xl w-full flex items-center justify-center">
                                                <CardContent className="flex pt-6 items-center justify-center">
                                                    <Calendar
                                                        mode="multiple"
                                                        selected={selectedDates}
                                                        className="rounded-2xl p-4"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </Page>
        </div>
    );
}