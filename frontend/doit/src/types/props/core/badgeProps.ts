import * as React from "react";
import {BadgeVariants} from "@/utils/components/core/badgeUtils";


export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        BadgeVariants {}
