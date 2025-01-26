import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/core/Card";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/core/Badge";
import { useCategories } from "@/hooks/useCategories";
import { VolunteerCardProps } from "@/types/props/card/volunteerCardProps";
import { Star } from "lucide-react";

export default function VolunteerCard({ volunteerData, requestId }: VolunteerCardProps) {
    const router = useRouter();
    const { categories } = useCategories();

    const handleClick = () => {
        const encodedData = encodeURIComponent(JSON.stringify(volunteerData));
        const url = requestId
            ? `/detailed/volunteer?data=${encodedData}&mode=review&id=${requestId}`
            : `/detailed/volunteer?data=${encodedData}`;
        router.push(url);
    };

    const commonCategories = categories.filter(category =>
        volunteerData.preferences.includes(category.label)
    );

    return (
        <Card
            className="flex items-stretch gap-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClick}
        >
            <div className="flex-1 relative">
                {requestId && (
                    <Star
                        className="absolute top-4 right-3 h-4 w-4 md:h-5 md:w-5 text-primary"
                        aria-hidden="true"
                    />
                )}
                <CardHeader className="pb-2 md:pb-6">
                    <CardDescription className="text-xs md:text-sm">Volontario</CardDescription>
                    <CardTitle className="text-base md:text-xl">
                        {volunteerData.firstName} {volunteerData.lastName}
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">
                                {volunteerData.city}
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-1 md:gap-2 pt-1 md:pt-2">
                            {commonCategories.map(category => (
                                <Badge
                                    key={category.id}
                                    variant="secondary"
                                    className="text-xs font-normal"
                                >
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
                    alt="Profilo Volontario"
                    className="w-24 md:w-60 h-full object-cover rounded-r-2xl shadow-lg"
                    width={240}
                    height={400}
                    priority
                />
            </div>
        </Card>
    );
}