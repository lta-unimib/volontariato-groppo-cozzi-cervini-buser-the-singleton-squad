"use client";

import { Button } from "@/components/core/Button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { makeDeleteRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ProfileHeaderProps } from "@/types/props/header/profileHeadersProps";
import { ProfileActions } from "@/components/header/components/ProfileActions";
/*
import { useState, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
*/

/**
 * ProfileHeader component renders the profile section with dynamic actions
 */
export const ProfileHeader = ({
                                  name,
                                  role,
                                  city,
                                  imageUrl,
                                  isAvailable,
                                  profileData,
                                  readOnly,
                              }: ProfileHeaderProps) => {
    const router = useRouter();
    const onBack = useBack();
/*
    const [hasSavedOrganization, setHasSavedOrganization] = useState(false);
    const [hasParticipatedInEvent, setHasParticipatedInEvent] = useState(false);

/!*    useEffect(() => {
        const fetchProfileDetails = async () => {
            if (!readOnly) return;

            try {
                // Check if organization is saved (for volunteer)
                if (role.toLowerCase() === 'organization') {
                    const savedOrgResponse = await makeGetRequest(`/volunteer/saved-organizations/`);
                    setHasSavedOrganization(savedOrgResponse.some((org: any) => org.id === profileData.id));
                }

                // Check event participation (for organization)
                if (role.toLowerCase() === 'volunteer') {
                    const participationResponse = await makeGetRequest(`/organization/event-participants/`);
                    setHasParticipatedInEvent(participationResponse.some((participant: any) => participant.id === profileData.id));
                }
            } catch (error) {
                console.error("Error fetching profile details", error);
            }
        };

        fetchProfileDetails();
    }, [readOnly, role, profileData]);*!/
*/

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(profileData));
        router.push(`/signup/${role.toLowerCase()}?mode=edit&data=${encodedData}`);
    };

    const handleDelete = async () => {
        const endpoint = `/profile/${role.toLowerCase()}/`;
        router.push("/");
        await makeDeleteRequest(endpoint);
    };

    const handleRemoveSavedOrg = async () => {
        const endpoint = `/volunteer/favorite/organization/{orgName}/`;
        await makeDeleteRequest(endpoint);
    };

    const handleReview = () => {
    };

    return (
        <div className="flex flex-col w-full">
            <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-foreground w-fit [&_svg]:!size-6 p-0 hover:bg-transparent mt-8 mb-4 md:hidden"
            >
                <ArrowLeft />
            </Button>
            <div className="flex items-start justify-between w-full lg:flex-row flex-col">
                <div className="flex items-center space-x-12">
                    <div className="relative">
                        <Image
                            src={imageUrl}
                            alt="Profile picture"
                            className="w-36 h-36 object-cover rounded-full shadow-lg"
                            width={144}
                            height={144}
                            priority
                        />
                        {isAvailable !== undefined && (
                            <span
                                className={`absolute bottom-3 right-3 w-4 h-4 rounded-full ${
                                    isAvailable ? "bg-green-500" : "bg-red-500"
                                }`}
                                title={isAvailable ? "Available" : "Unavailable"}
                            />
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{name}</h2>
                        <p className="text-lg text-muted-foreground">{role}</p>
                        <p className="text-sm text-muted-foreground">{city}</p>
                    </div>
                </div>
                <ProfileActions
                    role={role.toLowerCase() as 'volunteer' | 'organization'}
                    isOwnProfile={!readOnly}
/*                  hasSavedOrganization={hasSavedOrganization}
                    hasParticipatedInEvent={hasParticipatedInEvent}*/
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRemoveSavedOrg={role.toLowerCase() === 'volunteer' ? handleRemoveSavedOrg : undefined}
                    onReview={handleReview}
                />
            </div>
        </div>
    );
};