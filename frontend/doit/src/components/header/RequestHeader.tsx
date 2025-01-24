import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Badge } from "@/components/core/Badge";
import { makeDeleteRequest, makePostRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ButtonBack } from './components/ButtonBack';
import { ProfileActions } from './components/ProfileAction';
import Image from 'next/image';
import {RequestHeaderProps} from "@/types/props/header/requestHeaderProps";

/**
 * RequestHeader component renders the header for a request page, displaying request details such as the title, organization name, address, and categories.
 * It provides actions for subscribing, saving, editing, or deleting the request, depending on the user's role.
 *
 * @component
 *
 * @param {RequestHeaderProps} props - The props for the RequestHeader component.
 * @param {string} props.title - The title of the request.
 * @param {string} props.organizationName - The name of the organization that posted the request.
 * @param {string} props.address - The address associated with the request.
 * @param {string} props.imageUrl - The URL for the cover image of the request.
 * @param {object} props.requestData - The data of the request, used for editing.
 * @param {string} props.role - The role of the user (e.g., "volunteer" or "organization").
 *
 * @returns The rendered request header component with action buttons (subscribe, save, edit, delete).
 */
export const RequestHeader = ({
                                  title,
                                  organizationName,
                                  address,
                                  imageUrl,
                                  requestData,
                                  role,
                              }: RequestHeaderProps) => {
    const router = useRouter();
    const [idRequest, setIdRequest] = useState<string | undefined>(undefined);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');

        if (data) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(data));
                setIdRequest(parsedData.id);
            } catch (error) {
                console.error("Errore durante il parsing dei dati:", error);
            }
        }
    }, []);

    const handleSubscribe = async () => {
        const endpoint = `/offer/subscribe/${idRequest}/`;
        await makePostRequest(endpoint);
    };

    const handleSave = async () => {
        const endpoint = `/volunteer/favorite/organization/${organizationName}/`;
        await makePostRequest(endpoint);
    };

    const handleDelete = async () => {
        await makeDeleteRequest(`/request/${idRequest}/`);
        router.back();
    };

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        router.push(`/request/?mode=edit&data=${encodedData}`);
    };

    const onBack = useBack();

    const categories = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    const selectedCategories = categories.filter(category =>
        requestData.categories?.includes(category.id)
    );


    return (
        <div className="w-full">
            <ButtonBack onBack={onBack} />
            <div className="relative w-full h-48 mb-6">
                <Image
                    src={imageUrl}
                    alt="Cover image"
                    className="w-full h-full object-cover rounded-2xl"
                    fill
                    priority
                />
            </div>
            <div className="flex items-start justify-between w-full md:flex-row flex-col">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <p className="text-lg text-muted-foreground">{organizationName}</p>
                    <p className="text-sm text-muted-foreground">{address}</p>
                    {selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedCategories.map((category) => (
                                <Badge key={category.id} variant="secondary" className="font-normal">
                                    {category.label}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
                {role && (
                    <ProfileActions
                        role={role}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSave={handleSave}
                        onSubscribe={handleSubscribe}
                    />
                )}
            </div>
        </div>
    );
};