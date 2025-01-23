"use client"

import { organizationMenuItems } from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/refactored/sidebar/SidebarLayout";
import RequestCard from "@/components/ui/RequestCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { makeGetRequest } from "@/utils/refactored/api/apiUtils";
import { MdOutlineAdd } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";

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

export default function OrganizationDashboard() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegisteredToggle = async (enabled: boolean) => {
        console.log("handleRegisteredToggle", enabled);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>("/request/all/organization/");

                if (response.status === 200 && Array.isArray(response.data)) {
                    setRequests(response.data as Request[]);
                    console.log("Organization Requests:", response.data);
                } else {
                    setError("Failed to fetch requests");
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
                setError("An error occurred while fetching requests");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            <div className="flex w-full min-h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={organizationMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="relative w-full flex-1 flex flex-col">
                    <SearchBar
                        className="mt-12 md:mt-0 p-4 md:px-8"
                        label={"Terminate"}
                        onRegisteredToggle={handleRegisteredToggle}
                    />
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
                                    Nessuna richiesta trovata
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
                                        role="organization"
                                        requestData={request}
                                    />
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    <div className="absolute bottom-4 pb-32 md:pb-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
                        <Button
                            variant="default"
                            className="p-4 rounded-full !h-20 !w-20"
                            size="icon"
                            onClick={() => router.push("../request/")}
                        >
                            <MdOutlineAdd className="!h-6 !w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}