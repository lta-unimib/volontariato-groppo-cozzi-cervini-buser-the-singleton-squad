"use client";

import { MdOutlineReviews, MdOutlinePostAdd, MdOutlineAccountCircle } from "react-icons/md";

export const organizationMenuItems = [
    {
        title: "Richieste volontariato",
        url: "/dashboard/organization",
        icon: MdOutlinePostAdd,
        className: "md:inline hidden"
    },
    {
        title: "Recensioni",
        url: "/reviews",
        icon: MdOutlineReviews,
        className: "md:inline hidden"

    },
    {
        title: "Profilo",
        url: "/profile/organization",
        icon: MdOutlineAccountCircle,
        className: "md:inline hidden"
    },
];
