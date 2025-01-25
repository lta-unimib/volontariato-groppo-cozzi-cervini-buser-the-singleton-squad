import { Button } from "@/components/core/Button";
import {
    MdOutlineEdit,
    MdOutlineDelete,
    MdOutlineBookmarkBorder,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlineRateReview
} from "react-icons/md";
import React from "react";
import {RequestActionsProps} from "@/types/props/header/profileActionsProps";


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
    isSavedOrg = false,
    isEventExpired = false,
    hasReviewed = false
}) => {
    if (role === 'volunteer') {
        return (
            <div className="flex gap-2 mt-4 md:md-0">
                {/* Save Organization Button - Conditional Styling */}
                <Button
                    variant={isSavedOrg ? "destructive" : "secondary"}
                    size="default"
                    onClick={isSavedOrg ? onRemoveSavedOrg : onSave}
                >
                    <MdOutlineBookmarkBorder className="mr-2" />
                    {isSavedOrg ? "Rimuovi dai Preferiti" : "Salva Organizzazione"}
                </Button>

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

                {isEventExpired && isSavedOrg && (
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={onRemoveSavedOrg}
                    >
                        <MdOutlineBookmarkBorder className="mr-2" /> Rimuovi dai Preferiti
                    </Button>
                )}

                {isEventExpired && !isSubscribed && !isSavedOrg && (
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

    // se evento scaduto non puoi farlo (puoi solo riproporlo -> cambia nome al bottone modifica e fai una POST invece che una PUT)
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