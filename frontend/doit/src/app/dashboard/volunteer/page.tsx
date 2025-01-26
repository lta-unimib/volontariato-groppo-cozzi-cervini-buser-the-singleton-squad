"use client";

import { useState, useEffect } from 'react';
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import SearchBar from "@/components/SearchBar";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Button } from "@/components/core/Button";
import { GoogleMapsWrapper } from "@/components/maps/GoogleMapsWrapper";
import { GoogleMaps } from "@/components/maps/GoogleMaps";
import { MdMap } from "react-icons/md";

import { volunteerMenuItems } from "@/utils/components/sidebar/volunteerMenuItems";
import { IconType } from "react-icons";
import { useAllRequests, useVolunteerRequests } from '@/hooks/useRequestsFetching';
import { RequestSection } from '@/components/RequestSection';
import { Skeleton } from '@/components/sidebar/Skeleton';

export default function VolunteerDashboard() {
    const [showRequests, setShowRequests] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [isSubscribedView, setIsSubscribedView] = useState(() => {
        // Initialize from localStorage, default to false
        const savedState = localStorage.getItem('subscribedViewState');
        return savedState ? JSON.parse(savedState) : false;
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [mapLocations, setMapLocations] = useState<google.maps.LatLngLiteral[]>([]);

    const { requests, loading: allRequestsLoading, error: allRequestsError } =
        useAllRequests("/request/all/volunteer/sorted/");

    const {
        subscribedRequests,
        notVotedRequests,
        archivedRequests,
        loading: registeredRequestsLoading,
        error: registeredRequestsError,
    } = useVolunteerRequests();

    const OpportunityIcon: IconType = volunteerMenuItems.find((item) => item.title === "Opportunità")?.icon as IconType;

    const handleSubscribedToggle = (enabled: boolean) => {
        setIsSubscribedView(enabled);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
        return [];
    };

    const filterRequests = (requestList: any[]) => {
        if (!searchQuery) return requestList;

        const lowerQuery = searchQuery.toLowerCase();

        return requestList.filter(request => {
            // Safely check title
            const titleMatch = request.title &&
                request.title.toLowerCase().includes(lowerQuery);

            // Safely check description
            const descriptionMatch = request.description &&
                request.description.toLowerCase().includes(lowerQuery);

            // Safely check categories
            const categoryMatch = request.categories &&
                (Array.isArray(request.categories)
                    ? request.categories.some((category: string) =>
                        category.toLowerCase().includes(lowerQuery))
                    : request.categories.toLowerCase().includes(lowerQuery));

            // Safely check city
            const cityMatch = request.address && request.address.city &&
                request.address.city.toLowerCase().includes(lowerQuery);

            // Safely check organization name
            const orgMatch = request.organization && request.organization.name &&
                request.organization.name.toLowerCase().includes(lowerQuery);

            return titleMatch || descriptionMatch || categoryMatch ||
                cityMatch || orgMatch;
        });
    };

    const getMapRequestsAndLocations = () => {
        let filteredRequests;
        let filteredLocations;

        if (isSubscribedView) {
            // Combine all subscribed requests
            filteredRequests = [
                ...subscribedRequests,
                ...notVotedRequests,
                ...archivedRequests
            ];
        } else {
            filteredRequests = requests;
        }

        // Filter based on search query
        filteredRequests = filterRequests(filteredRequests);

        // Get corresponding locations for filtered requests
        filteredLocations = filteredRequests.map((request: any) => ({
            lat: request.cityInfo.latitude,
            lng: request.cityInfo.longitude,
        }));

        return { filteredRequests, filteredLocations };
    };

    const { filteredRequests, filteredLocations } = getMapRequestsAndLocations();

    const renderRequestContent = () => {
        const loading = isSubscribedView ? registeredRequestsLoading : allRequestsLoading;
        const error = isSubscribedView ? registeredRequestsError : allRequestsError;

        if (loading) {
            return (
                <div className="flex flex-col gap-4 w-full animate-pulse">
                    <Skeleton className="h-6 w-40 rounded-md" />
                    <Skeleton className="w-full h-28 flex items-center justify-between rounded-lg p-4"/>
                </div>
            );
        }

        if (error) {
            return <div className="flex items-center justify-center h-full">{error}</div>;
        }

        if (isSubscribedView) {
            const filteredRegistered = filterRequests(subscribedRequests);
            const filteredNotVoted = filterRequests(notVotedRequests);
            const filteredArchived = filterRequests(archivedRequests);

            return (
                <>
                    {filteredRegistered.length > 0 && (
                        <RequestSection title="Richieste Attive" requests={filteredRegistered} />
                    )}
                    {filteredNotVoted.length > 0 && (
                        <RequestSection title="In Attesa di Valutazione" requests={filteredNotVoted} />
                    )}
                    {filteredArchived.length > 0 && (
                        <RequestSection title="Richieste Archiviate" requests={filteredArchived} />
                    )}
                    {filteredRegistered.length === 0 &&
                        filteredNotVoted.length === 0 &&
                        filteredArchived.length === 0 && (
                            <div className="flex items-center justify-center h-full">Nessuna richiesta trovata</div>
                        )}
                </>
            );
        }

        const filteredRequests = filterRequests(requests);
        console.log(filteredRequests);

        return filteredRequests.length === 0 ? (
            <div className="flex items-center justify-center h-full">Nessuna richiesta trovata</div>
        ) : (
            <RequestSection title="Tutte le Richieste" requests={filteredRequests} />
        );
    };

    useEffect(() => {
        if (requests) {
            const locations = requests.map((request: any) => ({
                lat: request.cityInfo.latitude,
                lng: request.cityInfo.longitude,
            }));
            setMapLocations(locations);
        }
    }, [requests]);
    return (
        <div className={`w-full h-screen flex flex-col`}>
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
                        onSubscribedToggle={handleSubscribedToggle}
                        onSearch={handleSearch}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        {showRequests && renderRequestContent()}

                        {showMap && (
                            <div className="relative h-[calc(100vh-312px)] md:h-[calc(100vh-146px)] w-full">
                                <GoogleMapsWrapper>
                                    <GoogleMaps
                                        locations={filteredLocations}
                                        requests={filteredRequests}
                                        isSubscribedView={isSubscribedView}
                                    />
                                </GoogleMapsWrapper>
                            </div>
                        )}
                    </ScrollArea>
                    <div
                        className="absolute bottom-4 pb-32 md:pb-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
                        <Button
                            variant="default"
                            className="p-4 rounded-full !h-20 !w-20"
                            size="icon"
                            onClick={() => {
                                setShowRequests(!showRequests);
                                setShowMap(!showMap);
                            }}
                        >
                            {showRequests && <MdMap className="!h-6 !w-6" />}
                            {showMap && <OpportunityIcon className="!h-6 !w-6" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

