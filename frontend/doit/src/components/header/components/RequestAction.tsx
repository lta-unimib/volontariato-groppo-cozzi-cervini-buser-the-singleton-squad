import { Button } from "@/components/core/Button";
import {
    MdOutlineEdit,
    MdOutlineDelete,
    MdOutlineBookmarkBorder,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlineRateReview,
    MdOutlineRemove
} from "react-icons/md";
import React, {useState} from "react";
import {RequestActionsProps} from "@/types/props/header/requestActionsProps";

export const RequestActions: React.FC<RequestActionsProps> = ({
                                                                  role,
                                                                  onEdit,
                                                                  onDelete,
                                                                  onSave,
                                                                  onUnsubscribe,
                                                                  onRemoveSavedOrg,
                                                                  onReview,
                                                                  onSubscribe,
                                                                  isSubscribed = false,
                                                                  hasSavedOrganization,
                                                                  isEventExpired = false,
                                                                  hasReviewed = false,
                                                                  isLoading
                                                              }) => {
    // Move useState outside of conditional rendering
    const [isSaved, setIsSaved] = useState(hasSavedOrganization);

    if (isLoading) {
        return null;
    }

    const handleRemoveSavedOrg = async () => {
        if (onRemoveSavedOrg) {
            onRemoveSavedOrg();
            setIsSaved(false);
        }
    };

    const handleSaveOrg = async () => {
        if (onSave) {
            onSave();
            setIsSaved(true);
        }
    };

    if (role === 'volunteer') {
        return (
            <div className="flex gap-2 mt-4 md:md-0">
                {isSaved && onRemoveSavedOrg ? (
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
                        <MdOutlineEdit className="mr-2" /> Salva organizzazione
                    </Button>
                )}

                {/* Participate/Unsubscribe Button */}
                {isSubscribed ? (
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={onUnsubscribe}
                    >
                        <MdOutlineClose className="mr-2" />Disiscriviti
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        size="default"
                        onClick={onSubscribe}
                    >
                        <MdOutlineCheck className="mr-2" /> Partecipa
                    </Button>
                )}

                {isEventExpired && isSubscribed && !hasReviewed && (
                    <Button
                        variant="default"
                        size="default"
                        onClick={onReview}
                    >
                        <MdOutlineRateReview className="mr-2" /> Recensione
                    </Button>
                )}

                {isEventExpired && hasSavedOrganization && (
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={handleRemoveSavedOrg}
                    >
                        <MdOutlineRemove className="mr-2" /> Rimuovi dai preferiti
                    </Button>
                )}

                {isEventExpired && !isSubscribed && !hasSavedOrganization && (
                    <Button
                        variant="secondary"
                        size="default"
                        onClick={onSave}
                    >
                        <MdOutlineBookmarkBorder className="mr-2" /> Salva Organizzazione
                    </Button>
                )}
            </div>
        );
    }

    if (role === 'organization') {
        return (
            <div className="flex gap-2 mt-4 md:md-0">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={onDelete}
                >
                    <MdOutlineDelete />
                </Button>
                <Button
                    variant="secondary"
                    size="default"
                    onClick={onEdit}
                >
                    <MdOutlineEdit className="mr-2" /> Modifica
                </Button>
            </div>
        );
    }

    return null;
};