import {CityFormData} from "@/types/form/city/cityFormData";
import React from "react";

export interface CityListProps {
    cities: CityFormData[];
    selectedCity: string;
    highlightedIndex: number;
    onCitySelect: (city: CityFormData, e?: React.MouseEvent) => void;
    setHighlightedIndex: (index: number) => void;
    error: string | null;
}