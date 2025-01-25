"use client";

import { MdOutlineBusiness, MdOutlineDashboardCustomize, MdOutlineAccountCircle } from "react-icons/md";

/**
 * Menu items for the volunteer dashboard, each containing a title, URL, icon, and class for responsiveness.
 */
export const volunteerMenuItems = [
    {
        title: "Opportunità",
        url: "/dashboard/volunteer",
        icon: MdOutlineDashboardCustomize,
        className: "md:inline hidden"
    },
    {
        title: "Organizzazioni",
        url: "/organizations",
        icon: MdOutlineBusiness,
        className: "md:inline hidden"
    },
    {
        title: "Profilo",
        url: "/profile/volunteer",
        icon: MdOutlineAccountCircle,
        className: "md:inline hidden"
    },
];