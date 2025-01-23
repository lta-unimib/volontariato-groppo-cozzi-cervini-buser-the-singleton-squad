"use client";

import { volunteerMenuItems } from "@/app/dashboard/volunteer/utils/volunteerMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { makeGetRequest } from "@/utils/refactored/apiUtils";
import OrganizationCard from "@/app/organizations/components/OrganizationCard";
import SearchBar from "@/components/ui/SearchBar";
import {OrganizationFormData} from "@/types/refactored/model/organizationFormData";

interface ApiResponse {
    message: string;
    data: OrganizationFormData[];
    status: number;
}

export default function FavoriteOrganizations() {
    const [organizations, setOrganizations] = useState<OrganizationFormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFavoriteOrganizations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>("/organization/favorites");
            if (response?.status === 200 && Array.isArray(response.data)) {
                setOrganizations(response.data);
            } else {
                setError("Impossibile recuperare le organizzazioni preferite");
                setOrganizations([]);
            }
        } catch (error) {
            console.error("Errore nel recupero delle organizzazioni preferite:", error);
            setError("Si è verificato un errore nel recupero delle organizzazioni");
            setOrganizations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadOrganizations = async () => {
            await fetchFavoriteOrganizations();
        };

        loadOrganizations().catch(console.error);
    }, []);

    return (
        <div>
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
                        showFilters={false}
                        showToggle={false}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex mt-10 items-center justify-center h-full">
                                    <AiOutlineLoading3Quarters className="text-4xl animate-spin"/>
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-full">
                                    {error}
                                </div>
                            ) : organizations.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    Nessuna organizzazione preferita trovata
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold mb-4 px-2">Organizzazioni Preferite</h2>
                                    <div className="space-y-4">
                                        {organizations.map((org) => (
                                            <OrganizationCard
                                                key={org.email}
                                                organizationData={org}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}