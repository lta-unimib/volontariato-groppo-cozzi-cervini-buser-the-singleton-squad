import { Button } from "@/components/core/Button";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import React from "react";
import { DetailedActionsProps } from "@/types/props/header/detailedActionsProps";

export const OrganizationActions: React.FC<DetailedActionsProps> = ({ role, onSave }) => {
    const normalizedRole = role.toLowerCase();

    return (
        <div className="flex gap-2 mt-4 md:mt-0">
            {normalizedRole === "organization" && (
                <Button variant="destructive" size="default" onClick={onSave}>
                    <MdOutlineBookmarkBorder className="mr-2" /> Rimuovi
                </Button>
            )}
        </div>
    );
};
