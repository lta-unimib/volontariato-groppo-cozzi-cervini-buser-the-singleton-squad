"use client";

import { organizationMenuItems } from "@/app/dashboard/organization/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import { Page } from "@/components/layout/Page";
import { MdOutlineAdd } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";
import RequestCard from "@/components/ui/RequestCard";
import { useEffect, useState } from "react";
import { makeGetRequest } from "@/utils/apiUtils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Address {
    id: number;
    streetAddress: string;
    city: string;
    postalCode: string;
    houseNumber: string;
    additionalInformation: string;
}

interface Organization {
    name: string;
    email: string;
}

interface Request {
    id: number;
    title: string;
    detailedDescription: string;
    capacity: number;
    address: Address;
    volunteerType: string | null;
    startDateTime: string;
    endDateTime: string | null;
    organization: Organization;
    volunteerCategories: string[];
    city: string;
}

interface ApiResponse {
    message: string;
    data: Request[];
    status: string;
}

export default function Home() {
    const router = useRouter();
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>('/request/getall/organization/');

                if (response.status === 200 && Array.isArray(response.data)) {
                    setRequests(response.data as Request[]);
                    console.log('Requests:', response.data);
                } else {
                    setError('Failed to fetch requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('An error occurred while fetching requests');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Page>
            <div className="flex w-full h-screen">
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

                <div className="flex-1 my-4">
                    <ScrollArea className="h-full px-4 md:px-8">
                        <div className="space-y-4 h-full min-h-[10rem]">
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
                                    No requests found
                                </div>
                            ) : (
                                requests.map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        organization={request.organization.name}
                                        title={request.title}
                                        location={`${request.address.streetAddress}, ${request.address.city}`}
                                        date={request.startDateTime}
                                        image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                                    />
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    <Button
                        variant="default"
                        className={cn(
                            "fixed transform z-50 p-4 rounded-full !h-20 !w-20",
                            "left-1/2 -translate-x-1/2 bottom-36",
                            "md:left-auto md:right-4 md:-translate-x-0 md:bottom-4"
                        )}
                        size="icon"
                        onClick={() => router.push("../request/")}
                    >
                        <MdOutlineAdd className="!h-6 !w-6" />
                    </Button>
                </div>
            </div>
        </Page>
    );
}
