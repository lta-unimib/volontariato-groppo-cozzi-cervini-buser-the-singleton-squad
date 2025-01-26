"use client"

import { useState, useEffect } from "react";
import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/core/ScrollArea";
import SearchBar from "@/components/SearchBar";
import { Skeleton } from "@/components/sidebar/Skeleton";
import VolunteerCard from "@/components/card/VolunteerCard";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import {Card, CardContent, CardTitle} from "@/components/core/Card";

interface Address {
    id: number;
    streetAddress: string;
    city: string;
    postalCode: string;
    houseNumber: string;
    additionalInformation?: string;
}

interface Event {
    id: number;
    title: string;
    detailedDescription: string;
    address: Address;
    volunteers: Partial<VolunteerFormData>[];
    capacity: number;
}

interface EventResponse {
    message: string;
    data: Event[];
    status: string;
}

export default function EventVolunteers() {
    const [searchQuery] = useState("");
    const [eventsData, setEventsData] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const mockResponse: EventResponse = {
                    message: "get",
                    status: "OK",
                    data: [
                        {
                            id: 10,
                            title: "Aiuto animali marini",
                            detailedDescription: "Descrizione",
                            address: {
                                id: 10,
                                streetAddress: "Via Giacomo Matteotti",
                                city: "Bovisio-Masciago",
                                postalCode: "20813",
                                houseNumber: "1",
                                additionalInformation: "Interno 2"
                            },
                            volunteers: [
                                {
                                    email: "andreacozzi@gmail.com",
                                    firstName: "Andrea",
                                    lastName: "Cozzi",
                                    city: "Bovisio-Masciago",
                                    preferences: ["Ambiente", "Animali"]
                                }
                            ],
                            capacity: 2
                        }
                    ]
                };

                setEventsData(mockResponse.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch events");
                setLoading(false);
            }
        };

        void fetchEvents();
    }, []);

    const filterVolunteers = (volunteers: Partial<VolunteerFormData>[]) => {
        return volunteers.filter(volunteer =>
            !searchQuery ||
            volunteer.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volunteer.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volunteer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volunteer.preferences?.some(pref =>
                pref.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex w-full min-h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={organizationMenuItems}
                        header=""
                        side="left"
                        variant="floating"
                        collapsible="icon"
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="relative flex-1 flex flex-col">
                    <SearchBar
                        className="mt-12 md:mt-0 p-4 md:px-8"
                        showFilters={false}
                        showToggle={false}
                    />

                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <Skeleton className="h-6 w-40 rounded-md" />
                                <Skeleton className="w-full h-28 rounded-lg" />
                            </div>
                        ) : error ? (
                            <div
                                className="flex items-center justify-center h-full text-destructive"
                                role="alert"
                            >
                                {error}
                            </div>
                        ) : eventsData.length === 0 ? (
                            <div
                                className="flex items-center justify-center h-full text-gray-500"
                                aria-label="No events"
                            >
                                No events found
                            </div>
                        ) : (
                            <Card className="rounded-2xl">
                                <CardContent>
                                    <div className="space-y-6">
                                        {eventsData.map((event) => (
                                            <div key={event.id} className="rounded-lg p-4">
                                                <CardTitle className="text-xl font-bold my-4">
                                                    {event.title}
                                                    <p className="text-sm font-normal text-gray-700 pt-2">Partecipanti da recensire:</p>
                                                </CardTitle>
                                                <div className="space-y-4">
                                                    {filterVolunteers(event.volunteers).length === 0 ? (
                                                        <p className="text-gray-500">
                                                            No volunteers match the search criteria
                                                        </p>
                                                    ) : (
                                                        filterVolunteers(event.volunteers).map((volunteer) => (
                                                            <VolunteerCard
                                                                key={volunteer.email}
                                                                volunteerData={volunteer as VolunteerFormData}
                                                                requestId={event.id} // Pass the requestId here
                                                            />
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}