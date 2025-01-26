import React from "react";
import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { Card, CardContent } from "@/components/core/Card";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Calendar } from "@/components/form/availability/Calendar";
import { useCategories } from "@/hooks/useCategories";
import { VolunteerProfileContentProps } from "@/types/props/header/profileContentProps";
import {ReviewCard} from "@/components/review/ReviewCard";

export const VolunteerProfileContent: React.FC<VolunteerProfileContentProps> = ({
                                                                                    volunteerProfile,
                                                                                    selectedDays,
                                                                                    isAvailable,
                                                                                    readOnly
                                                                                }) => {
    const { categories } = useCategories();

    const commonCategories = categories.filter(category =>
        volunteerProfile.preferences.includes(category.label)
    );

    return (
        <>
            <div className="p-4 md:px-8">
                <ProfileHeader
                    name={`${volunteerProfile.firstName} ${volunteerProfile.lastName}`}
                    role="Volunteer"
                    city={volunteerProfile.city}
                    imageUrl="/placeholder.jpg"
                    isAvailable={isAvailable}
                    profileData={volunteerProfile}
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
                                <p className="text-sm text-muted-foreground mt-2">{volunteerProfile.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-foreground mb-4">Availability</h3>
                                <div className="flex justify-center">
                                    <Card className="rounded-2xl w-full flex items-center justify-center">
                                        <CardContent className="flex pt-6 items-center justify-center">
                                            <Calendar
                                                mode="multiple"
                                                selected={selectedDays}
                                                className="rounded-2xl p-4"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        {/* Preferences Section */}
                        <Card className="rounded-2xl">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-foreground mb-4">Preferences</h3>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {commonCategories.map(category => (
                                        <Badge key={category.label} variant="secondary" className="font-normal">
                                            {category.label}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Volunteer Review Card */}
                        <ReviewCard type={"volunteer"} idRequest={volunteerProfile.email}/>

                        {/* Contact Information Section */}
                        <Card className="rounded-2xl">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                                <ul className="text-sm text-muted-foreground mt-2">
                                    <li>Email: <a href={`mailto:${volunteerProfile.email}`}>{volunteerProfile.email}</a></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </>
    );
};
