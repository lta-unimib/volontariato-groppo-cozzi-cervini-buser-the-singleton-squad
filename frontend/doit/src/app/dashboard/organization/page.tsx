"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";

import SidebarLayout from "@/components/sidebar/SidebarLayout";
import SearchBar from "@/components/SearchBar";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Button } from "@/components/core/Button";

import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import { useAllRequests } from "@/hooks/useRequestsFetching";
import { RequestSection } from "@/components/RequestSection";
import {Skeleton} from "@/components/sidebar/Skeleton";

export default function OrganizationDashboard() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpiredView, setIsExpiredView] = useState(() => {
        const savedState = localStorage.getItem('expiredRequestsState');
        return savedState ? JSON.parse(savedState) : false;
    });

    const {
        requests,
        loading,
        error
    } = useAllRequests(
        isExpiredView ? "/request/all/expired/" : "/request/all/active/"
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
        return [];
    };

    const handleRegisteredToggle = (enabled: boolean) => {
        setIsExpiredView(enabled);
        localStorage.setItem('expiredRequestsState', JSON.stringify(enabled));
    };

    const filterRequests = () => {
        console.log(requests.filter(request => request.timeRange));
        return requests.filter(request =>
            !searchQuery ||
            request.title.toLowerCase().includes(searchQuery) ||
            request.description.toLowerCase().includes(searchQuery) ||
            request.categories?.some(cat =>
                cat.toLowerCase().includes(searchQuery)
            ) ||
            request.address.city.toLowerCase().includes(searchQuery)
        );
    };

    const filteredRequests = filterRequests();

    return (
        <div className={`w-full h-screen flex flex-col`}>
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
                        label={"Termina"}
                        onSubscribedToggle={handleRegisteredToggle}
                        onSearch={handleSearch}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex flex-col gap-4 w-full animate-pulse">
                                    <Skeleton className="h-6 w-40 rounded-md" />
                                    <Skeleton className="w-full h-36 flex items-center justify-between rounded-lg p-4"/>
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-full">
                                    {error}
                                </div>
                            ) : filteredRequests.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    Nessuna richiesta trovata
                                </div>
                            ) : (
                                <RequestSection
                                    title={isExpiredView ? "Richieste Terminate" : "Tutte le Richieste"}
                                    requests={filteredRequests}
                                    role="organization"
                                />
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