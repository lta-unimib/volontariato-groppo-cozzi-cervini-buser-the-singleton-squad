import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Badge } from "@/components/core/Badge";
import { makeDeleteRequest, makePostRequest } from "@/utils/api/apiUtils";
import { useBack } from "@/hooks/header/useBack";
import { ButtonBack } from './components/ButtonBack';
import {RequestActions} from './components/RequestAction';
import Image from 'next/image';
import { RequestHeaderProps } from "@/types/props/header/requestHeaderProps";
import {useFavoriteOrganizations} from "@/hooks/useFavoriteOrganizations";
import {useAllRequests, useVolunteerRequests} from "@/hooks/useRequestsFetching";
import ReviewDialog from '../review/ReviewDialog';
import {useReviewSubmission} from "@/types/form/useReviewSubmission";

export const RequestHeader = ({
                                  title,
                                  organizationName,
                                  address,
                                  imageUrl,
                                  requestData,
                                  role,
                              }: RequestHeaderProps) => {
    const router = useRouter();
    const onBack = useBack();

    const [idRequest, setIdRequest] = useState<string | undefined>(undefined);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const { submitReview } = useReviewSubmission('request');

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

    const { organizations, loading: organizationsLoading } = useFavoriteOrganizations();
    const { requests, loading: requestLoading } = useAllRequests("/request/all/expired/");
    const isTermianted = requests.some(request => request.id === idRequest);
    const hasSavedOrganization = organizations.some(org => org.organizationName === organizationName);

    const {
        subscribedRequests,
        notVotedRequests,
        archivedRequests,
        loading: requestsLoading
    } = useVolunteerRequests();

    const isSubscribed = subscribedRequests.some(req => req.id === idRequest);
    const isEventExpired = archivedRequests.some(req => req.id === idRequest);
    const hasNotReviewed = notVotedRequests.some(req => req.id === idRequest);

    console.log("Ho salvato organizzazione", hasSavedOrganization);
    console.log("Sono Iscritto", isSubscribed);
    console.log("Ero iscritto ed ho recensito", isEventExpired);
    console.log("Ero iscritto e non ho recensito", hasNotReviewed);

    /**
     * Handles the subscription action by sending a POST request to subscribe to the offer.
     */
    const handleSubscribe = async () => {
        const endpoint = `/offer/subscribe/${idRequest}/`;
        await makePostRequest(endpoint);
    };

    const handleUnsubscribe = async () => {
        const endpoint = `/offer/unsubscribe/${idRequest}/`;
        await makeDeleteRequest(endpoint);
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

    /**
     * Handles the remove saved organization action by sending a DELETE request to remove the organization from the favorites.
     */
    const handleRemoveSavedOrg = async () => {
        const endpoint = `/volunteer/favorite/organization/${organizationName}/`;
        await makeDeleteRequest(endpoint);
    };

    const handleRenew = async () => {
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        router.push(`/request/?mode=renew&data=${encodedData}`);
    }

    /**
     * Handles the review action by navigating to the review page.
     */
    const handleReview = () => {
        setIsReviewDialogOpen(true);
    };

    const handleReviewSubmit = async (rating: number) => {
        if (idRequest) {
            await submitReview(idRequest, rating);
        }
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
                        // Organization can edit or delete a request
                        onEdit={handleEdit}
                        onDelete={handleDelete}

                        // Volunteer can save or remove a favorite organization
                        onSave={handleSave}
                        onRemoveSavedOrg={handleRemoveSavedOrg}

                        // Volunteer can subscribe or unsubscribe from an event
                        onSubscribe={handleSubscribe}
                        onUnsubscribe={handleUnsubscribe}

                        // Volunteer can review a request after participating
                        onReview={handleReview}

                        isTerminated = {isTermianted}
                        onRenew={handleRenew}
                        hasSavedOrganization={hasSavedOrganization}
                        isSubscribed={isSubscribed}
                        isEventExpired={isEventExpired}
                        hasNotReviewed={hasNotReviewed}
                        isLoading={organizationsLoading || requestsLoading || requestLoading}
                    />
                )}
                <ReviewDialog
                    type="request"
                    requestName={title}
                    isOpen={isReviewDialogOpen}
                    onOpenChange={setIsReviewDialogOpen}
                    onSubmit={handleReviewSubmit}
                />
            </div>
        </div>
    );
};