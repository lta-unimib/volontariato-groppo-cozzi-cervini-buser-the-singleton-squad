import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Badge } from "@/components/core/Badge";
import { makeDeleteRequest, makePostRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ButtonBack } from './components/ButtonBack';
import {RequestActions} from './components/RequestAction';
import Image from 'next/image';
import { RequestHeaderProps } from "@/types/props/header/requestHeaderProps";

/**
 * RequestHeader component that displays a header for a specific request.
 * It shows details like title, organization name, address, categories, and provides actions for subscribing, saving, editing, or deleting.
 *
 * @param {RequestHeaderProps} props - The props for the component including request data, organization info, image URL, etc.
 * @returns - A JSX element representing the request header.
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

    /**
     * Parses the URL parameters to retrieve the request data and extract the request ID.
     */
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

    /**
     * Handles the subscription action by sending a POST request to subscribe to the offer.
     */
    const handleSubscribe = async () => {
        const endpoint = `/offer/subscribe/${idRequest}/`;
        await makePostRequest(endpoint);
    };

    /**
     * Handles the save action by sending a POST request to save the organization to the favorites.
     */
    const handleSave = async () => {
        const endpoint = `/volunteer/favorite/organization/${organizationName}/`;
        await makePostRequest(endpoint);
    };

    /**
     * Handles the delete action by sending a DELETE request to remove the request and navigate back.
     */
    const handleDelete = async () => {
        await makeDeleteRequest(`/request/${idRequest}/`);
        router.back();
    };

    /**
     * Navigates to the edit page with the request data encoded in the URL.
     */
    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        router.push(`/request/?mode=edit&data=${encodedData}`);
    };

    const onBack = useBack();

    /**
     * Handles the unsubscribe action by sending a POST request to unsubscribe from the offer.
     */
    const handleUnsubscribe = async () => {
        const endpoint = `/offer/unsubscribe/${idRequest}/`;
        await makePostRequest(endpoint);
    };

    /**
     * Handles the remove saved organization action by sending a DELETE request to remove the organization from the favorites.
     */
    const handleRemoveSavedOrg = async () => {
        const endpoint = `/volunteer/favorite/organization/${organizationName}/`;
        await makeDeleteRequest(endpoint);
    };

    /**
     * Handles the review action by navigating to the review page.
     */
    const handleReview = () => {
        router.push(`/review/${idRequest}`);
    };

    /**
     * Maps category IDs to category labels by formatting the ID string.
     * @returns {Array} - An array of category objects with 'id' and 'label' properties.
     */
    const selectedCategories = requestData.categories
        ? requestData.categories
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
                    <RequestActions
                        role={role}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSave={handleSave}
                        onSubscribe={handleSubscribe}
                        onUnsubscribe={handleUnsubscribe}
                        onRemoveSavedOrg={handleRemoveSavedOrg}
                        onReview={handleReview}
                        // Add the necessary props for the new scenarios
/*                        isSubscribed={/!* Add logic to determine if subscribed *!/}
                        isSavedOrg={/!* Add logic to determine if saved *!/}
                        isEventExpired={/!* Add logic to determine if event expired *!/}
                        hasReviewed={/!* Add logic to determine if reviewed *!/}*/
                    />
                )}
            </div>
        </div>
    );
};