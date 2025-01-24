import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/core/Card";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {OrganizationCardProps} from "@/types/props/card/organizationCardProps";

export default function OrganizationCard({ organizationData }: OrganizationCardProps) {
    const router = useRouter();

    const handleClick = () => {
        const encodedData = encodeURIComponent(JSON.stringify(organizationData));
        router.push(`/organization/details?data=${encodedData}`);
    };

    return (
        <Card
            className="flex items-stretch gap-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClick}
        >
            <div className="flex-1">
                <CardHeader className="pb-4 md:pb-6">
                    <CardDescription className="text-sm md:text-base">Organizzazione</CardDescription>
                    <CardTitle className="text-lg md:text-xl">{organizationData.organizationName}</CardTitle>
                </CardHeader>

                <CardFooter>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">
                                {organizationData.city}
                            </CardDescription>
                        </div>
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">
                                {organizationData.website || 'Nessun sito web'}
                            </CardDescription>
                        </div>
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">
                                {organizationData.email}
                            </CardDescription>
                        </div>
                    </div>
                </CardFooter>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="/api/placeholder/240/400"
                    alt="Logo Organizzazione"
                    className="w-36 md:w-60 h-full object-cover rounded-r-2xl shadow-lg"
                    width={240}
                    height={400}
                    priority
                />
            </div>
        </Card>
    );
}