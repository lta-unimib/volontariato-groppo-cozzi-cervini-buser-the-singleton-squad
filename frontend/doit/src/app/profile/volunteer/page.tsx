"use client"

import React, { useState, useMemo, useEffect } from "react";
import { volunteerMenuItems } from "@/app/dashboard/volunteer/utils/volunteerMenuItems";
import SidebarLayout from "@/components/refactored/sidebar/SidebarLayout";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Calendar } from "@/components/ui/date/Calendar";
import { Card, CardContent } from "@/components/ui/Card";
import { addMonths, eachDayOfInterval, getDay, startOfMonth } from "date-fns";
import { ProfileHeader } from "@/components/ui/ProfileHeader";
import { makeGetRequest } from "@/utils/refactored/api/apiUtils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AvailabilityFormData } from "@/types/refactored/availabilityFormData";
import { Badge } from "@/components/ui/Badge";
import { VolunteerFormData } from "@/types/refactored/form/auth/volunteerFormData";

interface ApiResponse {
    message: string;
    data: Request[];
    status: string;
}

export default function VolunteerProfile() {
    const [date] = useState<Date | undefined>(new Date());
    const [volunteerProfile, setVolunteerProfile] = useState<VolunteerFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse>("/profile/volunteer/");

                if (response.status === 200 && response.data) {
                    setVolunteerProfile(response.data as unknown as VolunteerFormData);
                } else {
                    setError("Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("An error occurred while fetching user profile");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getSelectedDays = (availability: AvailabilityFormData, currentMonth: Date): Date[] => {
        const startOfCurrentMonth = startOfMonth(currentMonth);
        const endOfPreview = addMonths(startOfCurrentMonth, 12);
        switch (availability.mode) {
            case "daily":
                if (!availability.timeRange) return [];
                return eachDayOfInterval({
                    start: startOfCurrentMonth,
                    end: endOfPreview
                });
            case "weekly":
                if (!availability.timeRange) return [];
                const availableDays = availability.timeRange.map((day) => {
                    const dayMapping: { [key: string]: number } = {
                        'Domenica': 0,
                        'Luned\u00EC': 1,
                        'Marted\u00EC': 2,
                        'Mercoled\u00EC': 3,
                        'Gioved\u00EC': 4,
                        'Venerd\u00EC': 5,
                        'Sabato': 6
                    };
                    return dayMapping[day];
                });
                return eachDayOfInterval({
                    start: startOfCurrentMonth,
                    end: endOfPreview
                }).filter(date => availableDays.includes(getDay(date)));
            case "monthly":
                if (!availability.timeRange) return [];
                const [startDate, endDate] = availability.timeRange.map((dateStr) => new Date(dateStr));
                return eachDayOfInterval({
                    start: startOfCurrentMonth,
                    end: endOfPreview
                }).filter(date => date.getDate() >= startDate.getDate() && date.getDate() <= endDate.getDate());
            default:
                return [];
        }
    };

    const selectedDays = useMemo(() => {
        return date && volunteerProfile?.availability
            ? getSelectedDays(volunteerProfile.availability, date)
            : [];
    }, [date, volunteerProfile]);

    const isAvailable = selectedDays.some((d) => d.toDateString() === new Date().toDateString());

    const renderProfileContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
                </div>
            );
        }

        if (error || !volunteerProfile) {
            return (
                <div className="flex items-center justify-center h-full">
                    {error || "Failed to load user profile"}
                </div>
            );
        }

        return (
            <>
                <div className="p-4 md:px-8">
                    <ProfileHeader
                        name={`${volunteerProfile.firstName} ${volunteerProfile.lastName}`}
                        role="Volunteer"
                        city={volunteerProfile.city}
                        imageUrl="https://www.zooplus.it/magazine/wp-content/uploads/2024/01/capibara.jpeg"
                        isAvailable={isAvailable}
                        profileData={volunteerProfile}
                    />
                </div>

                <ScrollArea className="flex-1 p-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <Card className="rounded-2xl">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-semibold text-foreground">About</h3>
                                    <p className="text-sm text-muted-foreground mt-2">{volunteerProfile.description}</p>
                                </CardContent>
                            </Card>

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
                                            ))
                                        }
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                                    <ul className="text-sm text-muted-foreground mt-2">
                                        <li>Email: <a href={`mailto:${volunteerProfile.email}`}>{volunteerProfile.email}</a></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

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
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="flex w-full min-h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={volunteerMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="flex-1 flex flex-col pb-28 md:pb-4">
                    {renderProfileContent()}
                </div>
            </div>
        </div>
    );
}