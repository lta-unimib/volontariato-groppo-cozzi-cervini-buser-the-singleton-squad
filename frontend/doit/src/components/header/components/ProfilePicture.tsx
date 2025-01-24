import Image from "next/image";
import React from "react";
import {ProfilePictureProps} from "@/types/props/header/profilePictureProps";

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageUrl, isAvailable }) => (
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
);
