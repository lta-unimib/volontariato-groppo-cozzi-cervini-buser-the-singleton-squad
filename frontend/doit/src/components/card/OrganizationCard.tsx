import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/core/Card";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { OrganizationCardProps } from "@/types/props/card/organizationCardProps";
import { Badge } from "@/components/core/Badge";
import { useCategories } from "@/hooks/useCategories";

/**
 * Component for displaying an organization's profile card.
 * It includes the organization's name, city, and related categories.
 *
 * @param {OrganizationCardProps} props - The properties for the organization card.
 * @param {Object} props.organizationData - The organization's data.
 * @returns The OrganizationCard component.
 */


export default function OrganizationCard({ organizationData }: OrganizationCardProps) {
    const router = useRouter();
    const { categories, loading } = useCategories();

    const handleClick = () => {
        const encodedData = encodeURIComponent(JSON.stringify(organizationData));
        router.push(`/detailed/organization?data=${encodedData}`);
    };

    const commonCategories = categories.filter(category =>
        organizationData.preferences.includes(category.label)
    );

    if (loading) {
        return null;
    }

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
                        <div className="flex flex-wrap gap-2 pt-2">
                            {commonCategories.map(category => (
                                <Badge key={category.id} variant="secondary" className="font-normal">
                                    {category.label}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardFooter>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="/placeholder.jpg"
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