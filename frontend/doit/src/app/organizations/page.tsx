"use client";

import { useState } from "react";
import { volunteerMenuItems } from "@/utils/components/sidebar/volunteerMenuItems";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/core/ScrollArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBar from "@/components/SearchBar";
import OrganizationCard from "@/components/card/OrganizationCard";
import { useFavoriteOrganizations } from "@/hooks/useFavoriteOrganizations";

/**
 * `FavoriteOrganizations` Component.
 *
 * This component displays a list of the user's favorite organizations.
 * It manages loading and error states, and displays a list of organizations
 * with appropriate feedback messages.
 *
 * @returns The layout displaying the favorite organizations with a loading state or error messages.
 */

export default function FavoriteOrganizations() {
    const [searchQuery, setSearchQuery] = useState("");
    const { organizations, loading, error } = useFavoriteOrganizations();

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
        return [];
    };

    const filterOrganizations = () => {
        return organizations.filter(org =>
            !searchQuery ||
            org.organizationName.toLowerCase().includes(searchQuery) ||
            org.description?.toLowerCase().includes(searchQuery) ||
            org.preferences?.some(pref =>
                pref.toLowerCase().includes(searchQuery)
            )
        );
    };

    const filteredOrganizations = filterOrganizations();

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex w-full min-h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={volunteerMenuItems}
                        header=""
                        side="left"
                        variant="floating"
                        collapsible="icon"
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="relative flex-1 flex flex-col">
                    <SearchBar
                        className="mt-12 md:mt-0 p-4 md:px-8"
                        showFilters={false}
                        showToggle={false}
                        onSearch={handleSearch}
                    />
                    <ScrollArea className="flex-1 p-4 pb-32 md:pb-4 md:px-8">
                        <div className="space-y-4">
                            {loading ? (
                                <div
                                    className="flex mt-10 items-center justify-center h-full"
                                    aria-label="Caricamento organizzazioni"
                                >
                                    <AiOutlineLoading3Quarters
                                        className="text-4xl animate-spin"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Caricamento in corso</span>
                                </div>
                            ) : error ? (
                                <div
                                    className="flex items-center justify-center h-full text-red-500"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            ) : filteredOrganizations.length === 0 ? (
                                <div
                                    className="flex items-center justify-center h-full text-gray-500"
                                    aria-label="Nessuna organizzazione"
                                >
                                    Nessuna organizzazione preferita trovata
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <h2
                                        className="text-lg font-semibold mb-4 px-2"
                                        id="favorite-organizations-title"
                                    >
                                        Organizzazioni Preferite
                                    </h2>
                                    <div
                                        className="space-y-4"
                                        aria-labelledby="favorite-organizations-title"
                                    >
                                        {filteredOrganizations.map((org) => (
                                            <OrganizationCard
                                                key={org.organizationName || org.email}
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