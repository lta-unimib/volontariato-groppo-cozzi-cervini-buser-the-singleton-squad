"use client";

import { Button } from "@/components/ui/Button";
import { MdOutlineEdit } from "react-icons/md";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { RequestFormData } from "@/types/formData";

interface RequestHeaderProps {
    title: string;
    organizationName: string;
    address: string;
    imageUrl: string;
    categories?: string[];
    requestData: RequestFormData;
    userRole?: 'Organization' | 'Volunteer';
}

export const RequestHeader = ({
                                  title,
                                  organizationName,
                                  address,
                                  imageUrl,
                                  requestData,
                                  userRole
                              }: RequestHeaderProps) => {
    const router = useRouter();

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        router.push(`/request/?mode=edit&data=${encodedData}`);
    };

    return (
        <div className="w-full">
            {/* Cover Image */}
            <div className="relative w-full h-48 md:h-64 mb-6">
                <Image
                    src={imageUrl}
                    alt="Cover image"
                    className="w-full h-full object-cover"
                    fill
                    priority
                />
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold">{title}</h2>
                        <p className="text-lg text-muted-foreground">{organizationName}</p>
                        <p className="text-sm text-muted-foreground">{address}</p>
                    </div>

                    {/* Edit Button - Only shown for organizations */}
                    {userRole === 'Organization' && (
                        <Button
                            variant="secondary"
                            size="default"
                            onClick={handleEdit}
                            className="mt-4 md:mt-0"
                        >
                            <MdOutlineEdit className="mr-2" />
                            Modifica
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};