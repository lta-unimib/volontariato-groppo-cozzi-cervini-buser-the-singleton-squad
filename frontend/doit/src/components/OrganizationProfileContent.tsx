import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { Card, CardContent } from "@/components/core/Card";
import { ScrollArea } from "@/components/core/ScrollArea";
import { ProfileContentProps } from "@/types/props/header/profileContentProps";
import React from "react";

/**
 * `OrganizationProfileContent` is a component that displays the detailed information of an organization profile,
 * including the profile header, about section, areas of interest, and contact information.
 *
 * @param props - The component props.
 * @param organizationProfile - The organization profile data to be displayed.
 * @param categories - An array of categories available for filtering areas of interest.
 * @param formatWebsiteUrl - A function that formats the website URL, used to properly display the organization's website link.
 * @returns The rendered organization profile content.
 */
export const OrganizationProfileContent: React.FC<ProfileContentProps> = ({ organizationProfile, categories, formatWebsiteUrl }) => (
    <>
        <div className="p-4 md:px-8">
            <ProfileHeader
                name={organizationProfile.organizationName}
                role={organizationProfile.role ?? "Organization"}
                city={organizationProfile.city}
                imageUrl="/placeholder.jpg"
                profileData={organizationProfile}
            />
        </div>

        <ScrollArea className="flex-1 p-4 md:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground">About</h3>
                            <p className="text-sm text-muted-foreground mt-2">{organizationProfile.description}</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Interest</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories
                                    .filter(category => organizationProfile.preferences.includes(category.id))
                                    .map(category => (
                                        <Badge key={category.id} variant="secondary" className="font-normal">
                                            {category.label}
                                        </Badge>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                            <ul className="text-sm text-muted-foreground mt-2">
                                <li>Email: <a href={`mailto:${organizationProfile.email}`}>{organizationProfile.email}</a></li>
                                <li>
                                    Website: <a href={formatWebsiteUrl(organizationProfile.website ?? "")} target="_blank" rel="noopener noreferrer">
                                    {organizationProfile.website}
                                </a>
                                </li>
                                <li>VAT Number: {organizationProfile.VATNumber}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    </>
);