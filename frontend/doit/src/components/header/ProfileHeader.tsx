"use client";

import { Button } from "@/components/core/Button";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { makeDeleteRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ProfileHeaderProps } from "@/types/props/header/profileHeadersProps";

/**
 * ProfileHeader component renders the profile section of a user with the option to edit or delete the profile.
 *
 * The component displays the user's profile picture, name, role, city, and availability status.
 * It also provides buttons for editing and deleting the profile.
 *
 * @component
 *
 * @param {ProfileHeaderProps} props - The props for the ProfileHeader component.
 * @param {string} props.name - The name of the user.
 * @param {string} props.role - The role of the user (e.g., "volunteer" or "organization").
 * @param {string} props.city - The city where the user is located.
 * @param {string} props.imageUrl - The URL for the user's profile picture.
 * @param {boolean} [props.isAvailable] - The availability status of the user (optional).
 * @param {object} props.profileData - The profile data used for editing the profile.
 *
 * @returns The rendered profile header component with edit and delete functionality.
 */
export const ProfileHeader = ({
                                  name,
                                  role,
                                  city,
                                  imageUrl,
                                  isAvailable,
                                  profileData,
                              }: ProfileHeaderProps) => {
    const router = useRouter();
    const onBack = useBack();

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(profileData));
        router.push(`/signup/${role.toLowerCase()}?mode=edit&data=${encodedData}`);
    };

    const handleDelete = async () => {
        console.log("Profilo eliminato");
        const endpoint = `/profile/${role.toLowerCase()}/`;
        router.push("/");
        await makeDeleteRequest(endpoint);
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
                <div className="flex items-center space-x-4 mt-0 ml-48 lg:mt-12">
                    <Button variant="destructive" size="icon" onClick={handleDelete}>
                        <MdOutlineDelete />
                    </Button>
                    <Button variant="secondary" size="default" className="mt-0" onClick={handleEdit}>
                        <MdOutlineEdit className="mr-2" />
                        Modifica
                    </Button>
                </div>
            </div>
        </div>
    );
};
