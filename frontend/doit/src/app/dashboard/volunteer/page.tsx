"use client";

import { Page } from "@/components/layout/Page";
import { volunteerMenuItems } from "@/app/dashboard/volunteer/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import RequestCard from "@/components/ui/RequestCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { makeGetRequest } from "@/utils/apiUtils";

interface Address {
    street: string;
    city: string;
    postalCode: string;
    number: string;
    additionalInfo: string;
}

interface Organization {
    name: string;
    email: string;
    website: string;
    VATNumber: string;
}

interface Request {
    id: string;
    title: string;
    description: string;
    volunteerCapacity: string;
    address: Address;
    startTime: string;
    endTime: string;
    organization: Organization;
    categories: string[];
    timeRange: [string, string];
    frequency: string[];
}

interface ApiResponse {
    message: string;
    data: Request[];
    status: string;
}

const formatDateRange = (timeRange: [string, string]) => {
    const months = [
        'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
        'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];

    const [start, end] = timeRange.map(date => {
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    });

    return `${start} - ${end}`;
};

export default function Home() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>("/request/all/");

                if (response.status === 200 && Array.isArray(response.data)) {
                    setRequests(response.data as Request[]);
                    console.log("Offers:", response.data);
                } else {
                    setError("Failed to fetch offers");
                }
            } catch (error) {
                console.error("Error fetching offers:", error);
                setError("An error occurred while fetching offers");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Page>
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

                <div className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex mt-10 items-center justify-center h-full">
                                    <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-full">
                                    {error}
                                </div>
                            ) : requests.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    No offers found
                                </div>
                            ) : (
                                requests.map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        organization={request.organization.name}
                                        title={request.title}
                                        location={`${request.address.street}, ${request.address.city}`}
                                        date={formatDateRange(request.timeRange)}
                                        image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                                        role="volunteer"
                                        requestData={request}
                                    />
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Page>
    );
}