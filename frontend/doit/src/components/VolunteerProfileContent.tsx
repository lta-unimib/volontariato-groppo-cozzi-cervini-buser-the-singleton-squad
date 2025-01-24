import React from "react";
import { ProfileHeader } from "@/components/header/ProfileHeader";
import { Badge } from "@/components/core/Badge";
import { Card, CardContent } from "@/components/core/Card";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Calendar } from "@/components/form/availability/Calendar";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";

interface VolunteerProfileContentProps {
    volunteerProfile: VolunteerFormData;
    categories: { id: string, label: string }[];
    selectedDays: Date[];
    isAvailable: boolean;
}

/**
 * `VolunteerProfileContent` is a React component that displays detailed information about a volunteer's profile, including:
 * - Basic information such as name, role, and city.
 * - A description of the volunteer.
 * - The volunteer's preferences.
 * - Contact information (email).
 * - Availability, displayed on a calendar.
 *
 * @param props - The component props.
 * @param {VolunteerFormData} props.volunteerProfile - The volunteer profile data to display.
 * @param {Array<{ id: string, label: string }>} props.categories - A list of categories used to display preferences.
 * @param {Date[]} props.selectedDays - The days the volunteer is available, to be displayed on the calendar.
 * @param {boolean} props.isAvailable - Indicates if the volunteer is available or not.
 *
 * @returns The rendered volunteer profile content.
 */
export const VolunteerProfileContent: React.FC<VolunteerProfileContentProps> = ({ volunteerProfile, categories, selectedDays, isAvailable }) => (
    <>
        <div className="p-4 md:px-8">
            <ProfileHeader
                name={`${volunteerProfile.firstName} ${volunteerProfile.lastName}`}
                role="Volunteer"
                city={volunteerProfile.city}
                imageUrl="/placeholder.jpg"
                isAvailable={isAvailable}
                profileData={volunteerProfile}
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

                    {/* Preferences Section */}
                    <Card className="rounded-2xl">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Preferences</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories
                                    .filter(category => volunteerProfile.preferences.includes(category.id))
                                    .map(category => (
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
                                <li>Email: <a href={`mailto:${volunteerProfile.email}`}>{volunteerProfile.email}</a></li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Availability Section */}
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
        </ScrollArea>
    </>
);