"use client";

import { MdOutlineInbox } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

export const volunteerMenuItems = [
    {
        title: "Opportunità",
        url: "/dashboard/volunteer",
        icon: MdOutlineDashboardCustomize,
        className: "md:inline hidden"
    },
    {
        title: "Organizzazioni",
        url: "/message/volunteer",
        icon: MdOutlineInbox,
        className: "md:inline hidden"
    },
    {
        title: "Profilo",
        url: "/profile/volunteer",
        icon: MdOutlineAccountCircle,
        className: "md:inline hidden"
    },
];