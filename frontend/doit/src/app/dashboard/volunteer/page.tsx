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
    const [offers, setOffers] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>("/request/all/");

                if (response.status === 200 && Array.isArray(response.data)) {
                    setOffers(response.data as Request[]);
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
                            ) : offers.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    No offers found
                                </div>
                            ) : (
                                offers.map((offer) => (
                                    <RequestCard
                                        key={offer.id}
                                        organization={offer.organization.name}
                                        title={offer.title}
                                        location={`${offer.address.streetAddress}, ${offer.address.city}`}
                                        date={offer.startDateTime}
                                        image="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
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