"use client";

import { Button } from "@/components/ui/Button";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md"; // Aggiungi MdDelete
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { OrganizationFormData, VolunteerFormData } from "@/types/formData";

type ProfileData = VolunteerFormData | OrganizationFormData;

interface ProfileHeaderProps {
    name: string;
    role: string;
    city: string;
    imageUrl: string;
    isAvailable?: boolean;
    profileData: ProfileData;
}

export const ProfileHeader = ({
                                  name,
                                  role,
                                  city,
                                  imageUrl,
                                  isAvailable,
                                  profileData,
                              }: ProfileHeaderProps) => {
    const router = useRouter();

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(profileData));
        router.push(`/form/${role.toLowerCase()}?mode=edit&data=${encodedData}`);
    };

    const handleDelete = () => {
        console.log("Profilo eliminato");
    };

    const onBack = () => router.back();

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
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleDelete}
                    >
                        <MdOutlineDelete />
                    </Button>
                    <Button
                        variant="secondary"
                        size="default"
                        className="mt-0"
                        onClick={handleEdit}
                    >
                        <MdOutlineEdit className="mr-2" />
                        Modifica
                    </Button>
                </div>
            </div>
        </div>
    );
};
