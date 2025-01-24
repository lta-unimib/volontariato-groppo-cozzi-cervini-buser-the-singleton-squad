// src/app/organization/page.tsx
"use client"

import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import SidebarLayout from "@/components/sidebar/SidebarLayout";
import SearchBar from "@/components/SearchBar";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Button } from "@/components/core/Button";

import { organizationMenuItems } from "@/utils/components/sidebar/organizationMenuItems";
import {useAllRequests} from "@/hooks/useRequestsFetching";
import {RequestSection} from "@/components/RequestSections";

export default function OrganizationDashboard() {
    const router = useRouter();
    const { requests, loading, error } = useAllRequests("/request/all/organization/");

    const handleRegisteredToggle = async (enabled: boolean) => {
        console.log("handleRegisteredToggle", enabled);
    };

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
                                <RequestSection
                                    title="Tutte le Richieste"
                                    requests={requests}
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