import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { Card, CardContent } from "@/components/core/Card";
import { ScrollArea } from "@/components/core/ScrollArea";
import { OrganizationProfileContentProps } from "@/types/props/header/organizationProfileContentProps";
import React from "react";
import {useCategories} from "@/hooks/useCategories";

/**
 * Renders a detailed profile page for an organization with various sections.
 *
 * @component
 * @param props - The component properties
 * @param organizationProfile - The detailed profile information of the organization
 * @param formatWebsiteUrl - A function to format the organization's website URL
 *
 * @returns A comprehensive organization profile view
 */
export const OrganizationProfileContent: React.FC<OrganizationProfileContentProps> = ({
                                                                                          organizationProfile,
                                                                                          formatWebsiteUrl
                                                                                      }) => {
    // Retrieve categories using custom hook
    const { categories } = useCategories();

    // Filter categories matching organization's preferences
    const commonCategories = categories.filter(category =>
        organizationProfile.preferences.includes(category.label)
    );

    return (
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
                        {/* About Section */}
                        <Card className="rounded-2xl">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-foreground">About</h3>
                                <p className="text-sm text-muted-foreground mt-2">{organizationProfile.description}</p>
                            </CardContent>
                        </Card>

                        {/* Areas of Interest Section */}
                        <Card className="rounded-2xl">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Interest</h3>
                                <div className="flex flex-wrap gap-2">
                                    {commonCategories.map(category => (
                                        <Badge key={category.id} variant="secondary" className="font-normal">
                                            {category.label}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information Section */}
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
};