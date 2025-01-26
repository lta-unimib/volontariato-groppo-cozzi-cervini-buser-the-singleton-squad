import { Button } from "@/components/core/Button";
import {
    MdOutlineEdit,
    MdOutlineDelete,
    MdOutlineBookmarkBorder,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlineRateReview,
    MdOutlineRemove,
    MdOutlineAutorenew
} from "react-icons/md";
import React, { useState } from "react";
import { RequestActionsProps } from "@/types/props/header/requestActionsProps";

export const RequestActions: React.FC<RequestActionsProps> = ({
                                                                  role,
                                                                  onEdit,
                                                                  onDelete,
                                                                  onSave,
                                                                  onUnsubscribe,
                                                                  onRemoveSavedOrg,
                                                                  onReview,
                                                                    onRenew,
                                                                  onSubscribe,
                                                                  isSubscribed,
                                                                  hasSavedOrganization,
                                                                  isEventExpired,
                                                                  hasNotReviewed,
                                                                    isTerminated,
                                                                  isLoading
                                                              }) => {
    if (isLoading) {
        return null;
    }

    const [isLocalSaved, setIsLocalSaved] = useState(hasSavedOrganization);
    const [isLocalSubscribed, setIsLocalSubscribed] = useState(isSubscribed);

    const handleRemoveSavedOrg = async () => {
        if (onRemoveSavedOrg) {
            onRemoveSavedOrg();
            setIsLocalSaved(false);
        }
    };

    const handleSaveOrg = async () => {
        if (onSave) {
            onSave();
            setIsLocalSaved(true);
        }
    };

    const handleSubscribe = async () => {
        if (onSubscribe) {
            onSubscribe();
            setIsLocalSubscribed(true);
        }
    };

    const handleUnsubscribe = async () => {
        if (onUnsubscribe) {
            onUnsubscribe();
            setIsLocalSubscribed(false);
        }
    };

    const handleReview = async () => {
        if (onReview) {
            onReview();
        }
    };

    const handleRenew = async () => {
        if(onRenew) {
            onRenew();
        }
    }

    const OrganizationSaveButton = () => (
        isLocalSaved ? (
            <Button
                variant="destructive"
                size="default"
                onClick={handleRemoveSavedOrg}
            >
                <MdOutlineRemove className="mr-2" /> Rimuovi dai preferiti
            </Button>
        ) : (
            <Button
                variant="secondary"
                size="default"
                onClick={handleSaveOrg}
            >
                <MdOutlineBookmarkBorder className="mr-2" /> Salva organizzazione
            </Button>
        )
    );


    console.log("Ho salvato organizzazione - action", hasSavedOrganization);
    console.log("Sono Iscritto - action", isSubscribed);
    console.log("Ero iscritto ed ho recensito - action", isEventExpired);
    console.log("Ero iscritto e non ho recensito - action", hasNotReviewed);

    if (role === 'volunteer') {
        if (!isLocalSubscribed && !hasNotReviewed && !isEventExpired) {
            console.log("1")
            return (
                <div className="flex gap-2 mt-4 md:md-0">
                    <OrganizationSaveButton />
                    <Button
                        variant="default"
                        size="default"
                        onClick={handleSubscribe}
                    >
                        <MdOutlineCheck className="mr-2" /> Partecipa
                    </Button>
                </div>
            );
        }

        if (isLocalSubscribed) {
            console.log("2")
            return (
                <div className="flex gap-2 mt-4 md:md-0">
                    <OrganizationSaveButton />
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={handleUnsubscribe}
                    >
                        <MdOutlineClose className="mr-2" /> Disiscriviti
                    </Button>
                </div>
            );
        }

        if (!isLocalSubscribed && hasNotReviewed) {
            console.log("3")
            console.log("Soluzione corretta")
            return (
                <div className="flex gap-2 mt-4 md:md-0">
                    <OrganizationSaveButton />
                    <Button
                        variant="default"
                        size="default"
                        onClick={handleReview}
                    >
                        <MdOutlineRateReview className="mr-2" /> Recensisci
                    </Button>
                </div>
            );
        }

        if (isLocalSubscribed && !hasNotReviewed && isEventExpired) {
            console.log("4")
            return (
                <div className="flex gap-2 mt-4 md:md-0">
                    <OrganizationSaveButton />
                    <Button
                        variant="default"
                        size="default"
                        onClick={handleReview}
                    >
                        <MdOutlineRateReview className="mr-2" /> Recensisci
                    </Button>
                </div>
            );
        }

        // Default case
        console.log("default")
        return (
            <div className="flex gap-2 mt-4 md:md-0">
                <OrganizationSaveButton />
            </div>
        );
    }

    if (role === 'organization') {
        return (
            <div className="flex gap-2 mt-4 md:md-0">
                <Button variant="destructive" size="icon" onClick={onDelete}>
                    <MdOutlineDelete />
                </Button>
                {!isTerminated ? (
                    <Button variant="secondary" size="default" onClick={onEdit}>
                        <MdOutlineEdit className="mr-2" /> Modifica
                    </Button>
                ) : (
                    <Button variant="default" size="default" onClick={handleRenew}>
                        <MdOutlineAutorenew className="mr-2" /> Riproponi
                    </Button>
                )}
            </div>
        );
    }
    return null;
};