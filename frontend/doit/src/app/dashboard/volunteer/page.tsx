"use client";

import { useState } from 'react';
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import SearchBar from "@/components/SearchBar";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Button } from "@/components/core/Button";
import { GoogleMapsWrapper } from "@/components/maps/GoogleMapsWrapper";
import { GoogleMaps } from "@/components/maps/GoogleMaps";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdMap } from "react-icons/md";

import { volunteerMenuItems } from "@/utils/components/sidebar/volunteerMenuItems";
import { IconType } from "react-icons";
import { useAllRequests, useVolunteerRequests } from '@/hooks/useRequestsFetching';
import { RequestSection } from '@/components/RequestSection';

/**
 * `VolunteerDashboard` Component.
 *
 * This is the dashboard page for users with the "volunteer" role.
 * It displays a sidebar, a search bar, and a section for managing requests.
 * It shows requests categorized by their status (active, awaiting evaluation, archived),
 * and allows the user to toggle between request lists and a map view.
 *
 * It uses the `useAllRequests` and `useVolunteerRequests` hooks to fetch and manage requests.
 *
 * @returns The main dashboard component for the volunteer, including sidebar,
 * search bar, requests sections, and a toggleable map view.
 */
export default function VolunteerDashboard() {
    const [showRequests, setShowRequests] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [isRegisteredView, setIsRegisteredView] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { requests, loading: allRequestsLoading, error: allRequestsError } =
        useAllRequests("/request/all/volunteer/sorted/");

    const {
        registeredRequests,
        notVotedRequests,
        archivedRequests,
        loading: registeredRequestsLoading,
        error: registeredRequestsError
    } = useVolunteerRequests();

    const OpportunityIcon: IconType = volunteerMenuItems.find(item => item.title === "Opportunità")?.icon as IconType;

    const handleRegisteredToggle = (enabled: boolean) => {
        setIsRegisteredView(enabled);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
        return []; // No specific search results needed
    };

    const filterRequests = (requestList: any[]) => {
        return requestList.filter(request =>
            !searchQuery ||
            request.title.toLowerCase().includes(searchQuery) ||
            request.description.toLowerCase().includes(searchQuery)
        );
    };

    const renderRequestContent = () => {
        const loading = isRegisteredView ? registeredRequestsLoading : allRequestsLoading;
        const error = isRegisteredView ? registeredRequestsError : allRequestsError;

        if (loading) {
            return (
                <div className="flex mt-10 items-center justify-center h-full">
                    <AiOutlineLoading3Quarters className="text-4xl animate-spin"/>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center h-full">
                    {error}
                </div>
            );
        }

        if (isRegisteredView) {
            const filteredRegistered = filterRequests(registeredRequests);
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
                            <div className="flex items-center justify-center h-full">
                                Nessuna richiesta trovata
                            </div>
                        )}
                </>
            );
        }

        const filteredRequests = filterRequests(requests);

        return filteredRequests.length === 0
            ? <div className="flex items-center justify-center h-full">Nessuna richiesta trovata</div>
            : <RequestSection title="Tutte le Richieste" requests={filteredRequests} />;
    };

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
                        onRegisteredToggle={handleRegisteredToggle}
                        onSearch={handleSearch}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        {showRequests && renderRequestContent()}

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
                                setShowRequests(!showRequests);
                                setShowMap(!showMap);
                            }}
                        >
                            {showRequests && <MdMap className="!h-6 !w-6"/>}
                            {showMap && <OpportunityIcon className="!h-6 !w-6"/>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}