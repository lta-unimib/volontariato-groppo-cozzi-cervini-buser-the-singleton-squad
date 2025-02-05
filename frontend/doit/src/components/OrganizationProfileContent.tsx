import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { Card, CardContent } from "@/components/core/Card";
import { ScrollArea } from "@/components/core/ScrollArea";
import { ProfileContentProps } from "@/types/props/header/profileContentProps";
import React from "react";
import { useCategories } from "@/hooks/useCategories";
import {ReviewCard} from "@/components/review/ReviewCard";
import {Button} from "@/components/core/Button";
import {FaFacebook, FaInstagram, FaPlus, FaTiktok, FaXTwitter} from "react-icons/fa6";

export const OrganizationProfileContent: React.FC<ProfileContentProps> = ({
                                                                              organizationProfile,
                                                                              formatWebsiteUrl,
                                                                              readOnly
                                                                          }) => {
    const { categories } = useCategories();

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
                    readOnly={readOnly}
                />
            </div>

            <ScrollArea className="flex-1 p-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                        <Badge key={category.label} variant="secondary" className="font-normal">
                                            {category.label}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <ReviewCard type="organization" idRequest={organizationProfile.email}/>
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
                                <div className="flex items-center gap-2 mt-6">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => window.open('https://www.instagram.com', '_blank')}
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => window.open('https://www.facebook.com', '_blank')}
                                    >
                                        <FaFacebook className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => window.open('https://www.tiktok.com', '_blank')}
                                    >
                                        <FaTiktok className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="rounded-full"
                                        onClick={() => window.open('https://www.x.com', '_blank')}
                                    >
                                        <FaXTwitter className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full"
                                        onClick={() => {/* Add custom action */}}
                                    >
                                        <FaPlus className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </>
    );
};
