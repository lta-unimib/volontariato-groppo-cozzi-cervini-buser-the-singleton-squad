import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/core/Card";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RequestCardProps } from "@/types/props/card/requestCardProps";

/**
 * RequestCard component that displays a card with request details.
 * The card includes information about the organization, title, location, date, and an image.
 * When the card is clicked, it navigates to the detailed request page.
 *
 * @param {RequestCardProps} props - The properties for the RequestCard component.
 * @param {string} props.organization - The name of the organization making the request.
 * @param {string} props.title - The title of the request.
 * @param {string} props.location - The location where the request is available.
 * @param {string} props.date - The date the request was made or is relevant.
 * @param {string} props.image - The URL of the image to be displayed on the card.
 * @param {object} props.requestData - The data related to the request, passed to the detailed page.
 * @param {string} props.role - The role related to the request (e.g., "volunteer", "manager").
 *
 * @returns The RequestCard component.
 */
export default function RequestCard({
                                        organization,
                                        title,
                                        location,
                                        date,
                                        image,
                                        role,
                                        requestData
                                    }: RequestCardProps) {
    const router = useRouter();

    /**
     * Handles the click event on the request card.
     * Encodes the request data and navigates to the detailed page with the encoded data.
     */
    const handleClick = () => {
        const encodedData = encodeURIComponent(JSON.stringify({ ...requestData, role }));
        router.push(`/detailed?data=${encodedData}`);
    };

    return (
        <Card
            className="flex items-stretch gap-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClick}
        >
            <div className="flex-1">
                <CardHeader className="pb-4 md:pb-6">
                    <CardDescription className="text-sm md:text-base">{organization}</CardDescription>
                    <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                </CardHeader>

                <CardFooter>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">{location}</CardDescription>
                        </div>
                        <div className="flex items-center">
                            <CardDescription className="text-xs md:text-sm">{date}</CardDescription>
                        </div>
                    </div>
                </CardFooter>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src={image}
                    alt="Descrizione immagine"
                    className="w-36 md:w-60 h-full object-cover rounded-r-2xl shadow-lg"
                    width={240}
                    height={400}
                    priority
                />
            </div>
        </Card>
    );
}