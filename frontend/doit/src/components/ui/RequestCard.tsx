import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import React from "react";

interface LayoutProps {
    organization: string,
    title: string,
    location: string,
    date: string,
    image: string
    children?: React.ReactNode;
}

import Image from 'next/image';

export default function RequestCard({
                                        organization,
                                        title,
                                        location,
                                        date,
                                        image
                                    }: LayoutProps) {
    return (
        <Card className="flex items-stretch gap-4 rounded-2xl">
            <div className="flex-1">
                <CardHeader className="pb-4 md:pb-6">
                    <CardDescription className="text-sm md:text-base">{organization}</CardDescription>
                    <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                </CardHeader>

                <CardFooter>
                    <div className="flex flex-col gap-1 md:gap-2 ">
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
                    className="w-36 md:w-60 h-full object-cover rounded-r-md shadow-lg"
                    width={240}
                    height={400}
                    priority
                />
            </div>
        </Card>
    );
}
