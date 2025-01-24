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
import {useAllRequests, useVolunteerRequests} from '@/hooks/useRequestsFetching';
import { RequestSection } from '@/components/RequestSections';

export default function VolunteerDashboard() {
    const [showRequests, setShowRequests] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [isRegisteredView, setIsRegisteredView] = useState(false);

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
            return (
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
            );
        }

        return requests.length === 0
            ? <div className="flex items-center justify-center h-full">Nessuna richiesta trovata</div>
            : <RequestSection title="Tutte le Richieste" requests={requests} />;
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