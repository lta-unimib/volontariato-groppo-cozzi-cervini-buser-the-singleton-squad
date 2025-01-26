"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Switch } from "@/components/core/Switch";
import { Badge } from "@/components/core/Badge";
import { SearchBarProps } from "@/types/props/searchBarProps";

export default function SearchBar({
                                      className,
                                      onSubscribedToggle,
                                      label = "Iscritto",
                                      showToggle = true,
                                      showFilters = true,
                                      filters = ["Filtro 1", "Filtro 2", "Filtro 3", "Filtro 4"],
                                      onFilterClick,
                                      onSearch,
                                      disabled = false,
                                      ...props
                                  }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedState = localStorage.getItem("subscribedViewState");
            setIsToggled(savedState ? JSON.parse(savedState) : false);
        }
    }, []);

    useEffect(() => {
        if (onSubscribedToggle) {
            onSubscribedToggle(isToggled);
        }
    }, [isToggled, onSubscribedToggle]);

    const handleSearchInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value);
            onSearch?.(value);
        },
        [onSearch]
    );

    const clearSearch = () => {
        setSearchTerm("");
        onSearch?.("");
        inputRef.current?.focus();
    };

    const handleToggleChange = (checked: boolean) => {
        setIsToggled(checked);
        if (typeof window !== "undefined") {
            localStorage.setItem("subscribedViewState", JSON.stringify(checked));
        }
    };

    return (
        <div className={`w-full mx-auto space-y-4 ${className}`} {...props}>
            <div className="relative">
                <div className="flex items-center">
                    <div className="relative flex-grow">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Cerca..."
                            value={searchTerm}
                            onChange={handleSearchInput}
                            className="w-full pl-10 pr-10 py-2 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    {showToggle && (
                        <div className="ml-4 flex items-center space-x-2">
                            <Switch
                                checked={isToggled}
                                onCheckedChange={handleToggleChange}
                                aria-label="Abilita ricerca API"
                                disabled={disabled}
                            />
                            <span className="text-sm text-muted-foreground">{label}</span>
                        </div>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <Badge
                            key={filter}
                            variant="outline"
                            className="cursor-pointer font-normal hover:bg-muted"
                            onClick={() => onFilterClick && onFilterClick(filter)}
                        >
                            {filter}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}