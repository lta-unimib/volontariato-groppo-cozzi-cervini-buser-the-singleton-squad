"use client";

import { Button } from "@/components/core/Button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {makeDeleteRequest, makePostRequest} from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ProfileHeaderProps } from "@/types/props/header/profileHeadersProps";
import { ProfileActions } from "@/components/header/components/ProfileActions";
import {useFavoriteOrganizations} from "@/hooks/useFavoriteOrganizations";

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

    const { organizations, loading } = useFavoriteOrganizations();
    const hasSavedOrganization = organizations.some(org => org.organizationName === name);

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
        const endpoint = `/volunteer/favorite/organization/${name}/`;
        await makeDeleteRequest(endpoint);
    };

    const handleReview = () => {
    };

    const handleSave = async () => {
        const endpoint = `/volunteer/favorite/organization/${name}/`;
        await makePostRequest(endpoint);
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
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRemoveSavedOrg={role.toLowerCase() === 'organization' ? handleRemoveSavedOrg : undefined}
                    onReview={handleReview}
                    onSave={handleSave}
                    isOwnProfile={!readOnly}
                    hasSavedOrganization={hasSavedOrganization}
                    //isSubscribed={hasParticipatedInEvent}
                    isLoading={loading}
                />
            </div>
        </div>
    );
};