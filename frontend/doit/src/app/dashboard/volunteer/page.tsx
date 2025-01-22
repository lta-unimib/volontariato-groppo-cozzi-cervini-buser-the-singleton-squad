"use client";

import { Page } from "@/components/layout/Page";
import { volunteerMenuItems } from "@/app/dashboard/volunteer/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import RequestCard from "@/components/ui/RequestCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { makeGetRequest } from "@/utils/apiUtils";
import { MdMap } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { GoogleMapsWrapper } from "@/app/dashboard/volunteer/components/GoogleMapsWrapper";
import { GoogleMaps } from "@/app/dashboard/volunteer/components/GoogleMaps";
import { IconType } from "react-icons";
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
    status: number;
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
    const [registeredRequests, setRegisteredRequests] = useState<Request[]>([]);
    const [notVotedRequests, setNotVotedRequests] = useState<Request[]>([]);
    const [archivedRequests, setArchivedRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showRequests, setShowRequests] = useState<boolean>(true);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [isRegisteredView, setIsRegisteredView] = useState(false);
    const OpportunityIcon: IconType = volunteerMenuItems.find(item => item.title === "Opportunità")?.icon as IconType;

    const fetchAllRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>("/request/all/volunteer/sorted/");
            if (response?.status === 200 && Array.isArray(response.data)) {
                setRequests(response.data);
            } else {
                setError("Failed to fetch offers");
                setRequests([]);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
            setError("An error occurred while fetching offers");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchRegisteredRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const [registered, notVoted, archived] = await Promise.all([
                makeGetRequest<ApiResponse>("/request/all/volunteer/registered/"),
                makeGetRequest<ApiResponse>("/request/all/volunteer/registered/notvoted/"),
                makeGetRequest<ApiResponse>("/request/all/volunteer/registered/archived/")
            ]);

            if (registered?.status === 200 && Array.isArray(registered.data)) {
                setRegisteredRequests(registered.data);
            } else {
                setRegisteredRequests([]);
            }

            if (notVoted?.status === 200 && Array.isArray(notVoted.data)) {
                setNotVotedRequests(notVoted.data);
            } else {
                setNotVotedRequests([]);
            }

            if (archived?.status === 200 && Array.isArray(archived.data)) {
                setArchivedRequests(archived.data);
            } else {
                setArchivedRequests([]);
            }
        } catch (error) {
            console.error("Error fetching registered requests:", error);
            setError("An error occurred while fetching registered requests");
            setRegisteredRequests([]);
            setNotVotedRequests([]);
            setArchivedRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            await fetchAllRequests();
        };

        initializeData().catch((error) => {
            console.error("Error initializing data:", error);
            setError("Failed to initialize data");
            setLoading(false);
        });
    }, []);

    const handleRegisteredToggle = async (enabled: boolean) => {
        setIsRegisteredView(enabled);
        if (enabled) {
            await fetchRegisteredRequests();
        } else {
            await fetchAllRequests();
        }
    };

    const RequestSection = ({ title, requests }: { title: string; requests: Request[] }) => (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 px-2">{title}</h2>
            <div className="space-y-4">
                {requests.map((request) => (
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
                ))}
            </div>
        </div>
    );

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

                <div className="relative flex-1 flex flex-col">
                    <SearchBar
                        className="mt-12 md:mt-0 p-4 md:px-8"
                        onRegisteredToggle={handleRegisteredToggle}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        {showRequests && (
                            <div className="space-y-4">
                                {loading ? (
                                    <div className="flex mt-10 items-center justify-center h-full">
                                        <AiOutlineLoading3Quarters className="text-4xl animate-spin"/>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-full">
                                        {error}
                                    </div>
                                ) : isRegisteredView ? (
                                    <>
                                        {registeredRequests.length > 0 && (
                                            <RequestSection title="Richieste Attive" requests={registeredRequests} />
                                        )}
                                        {notVotedRequests.length > 0 && (
                                            <RequestSection title="In Attesa di Valutazione" requests={notVotedRequests} />
                                        )}
                                        {archivedRequests.length > 0 && (
                                            <RequestSection title="Richieste Archiviate" requests={archivedRequests} />
                                        )}
                                        {!registeredRequests.length && !notVotedRequests.length && !archivedRequests.length && (
                                            <div className="flex items-center justify-center h-full">
                                                Nessuna richiesta registrata
                                            </div>
                                        )}
                                    </>
                                ) : requests.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        Nessuna richiesta trovata
                                    </div>
                                ) : (
                                    <RequestSection title="Tutte le Richieste" requests={requests} />
                                )}
                            </div>
                        )}

                        {showMap && (
                            <div className="relative h-[calc(100vh-312px)] md:h-[calc(100vh-144px)] w-full">
                                <GoogleMapsWrapper>
                                    <GoogleMaps/>
                                </GoogleMapsWrapper>
                            </div>
                        )}
                    </ScrollArea>
                    <div className="absolute bottom-4 pb-32 md:pb-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
                        <Button
                            variant="default"
                            className="p-4 rounded-full !h-20 !w-20"
                            size="icon"
                            onClick={() => {
                                if (showRequests) {
                                    setShowMap(true);
                                    setShowRequests(false);
                                } else {
                                    setShowMap(false);
                                    setShowRequests(true);
                                }
                            }}
                        >
                            {showRequests && (
                                <MdMap className="!h-6 !w-6"/>
                            )}
                            {showMap && (
                                <OpportunityIcon className="!h-6 !w-6"/>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}