import { Page } from '@/components/layout/Page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import React from "react";

interface LayoutProps {
    organization: string,
    description: string,
    location: string,
    date: string,
    image: string
}

export default function OfferCard({
                                    organization,
                                    description,
                                    location,
                                    date,
                                    image
                                  }: LayoutProps) {
    return (
        <Page>
            <Card className="flex items-stretch gap-4">
                <div className="flex-1">
                    <CardHeader>
                        <CardDescription>{organization}</CardDescription>
                        <CardTitle>{description}</CardTitle>
                    </CardHeader>

                    <CardFooter>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <CardDescription>{location}</CardDescription>
                            </div>
                            <div className="flex items-center">
                                <CardDescription>{date}</CardDescription>
                            </div>
                        </div>
                    </CardFooter>
                </div>
                <div className="flex-shrink-0">
                    <img
                        src={image}
                        alt="Descrizione immagine"
                        className="w-60 h-full object-cover rounded-r-md shadow-lg"
                    />
                </div>
            </Card>
        </Page>
    );
}
