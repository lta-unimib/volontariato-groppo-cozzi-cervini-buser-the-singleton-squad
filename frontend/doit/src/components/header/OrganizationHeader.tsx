import { Badge } from "@/components/core/Badge";
import { makeDeleteRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ButtonBack } from './components/ButtonBack';
import Image from 'next/image';
import {OrganizationHeaderProps} from "@/types/props/header/organizationHeaderProps";
import { OrganizationActions } from "./components/OrganizationActions";

/**
 * RequestHeader component that displays a header for a specific request.
 * It shows details like title, organization name, address, categories, and provides actions for subscribing, saving, editing, or deleting.
 *
 * @param {RequestHeaderProps} props - The props for the component including request data, organization info, image URL, etc.
 * @returns - A JSX element representing the request header.
 */
export const OrganizationHeader = ({
                                  organizationName,
                                  city,
                                  imageUrl,
                                  organizationData,
                                  role,
                              }: OrganizationHeaderProps) => {

    /**
     * Handles the subscription action by sending a POST request to subscribe to the offer.
     */
    const handleUnsubscribe = async () => {
        const endpoint = `/volunteer/favorite/organization/${organizationName}/`;
        await makeDeleteRequest(endpoint);
    };

    const onBack = useBack();

    /**
     * Maps category IDs to category labels by formatting the ID string.
     * @returns {Array} - An array of category objects with 'id' and 'label' properties.
     */
    const selectedPreferences = organizationData.preferences
        ? organizationData.preferences
            .map((categoryId: string) => ({
                id: categoryId,
                label: categoryId
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            }))
        : [];

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
                    <h2 className="text-2xl font-semibold">{organizationName}</h2>
                    <p className="text-sm text-muted-foreground">{city}</p>
                    {selectedPreferences.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedPreferences.map((preference) => (
                                <Badge key={preference.id} variant="secondary" className="font-normal">
                                    {preference.label}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
                {role && (
                    <OrganizationActions
                        role={role}
                        onSave={handleUnsubscribe}
                    />
                )}
            </div>
        </div>
    );
};