"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Switch } from "@/components/core/Switch"
import { Badge } from "@/components/core/Badge"
import {SearchBarProps} from "@/types/props/searchBarProps";

/**
 * `SearchBar` is a search input component with additional toggle and filter functionality. It includes:
 * - A text input for search terms with an icon.
 * - A toggle switch to enable/disable additional search options.
 * - A set of clickable filters to narrow down the search results.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional class names to style the component.
 * @param {function} props.onRegisteredToggle - Callback function triggered when the toggle switch is changed.
 * @param {string} [props.label="Iscritto"] - The label to display next to the toggle switch.
 * @param {boolean} [props.showToggle=true] - Determines whether to show the toggle switch.
 * @param {boolean} [props.showFilters=true] - Determines whether to show the filter badges.
 * @param {Array<string>} [props.filters=["Filtro 1", "Filtro 2", "Filtro 3", "Filtro 4"]] - List of filters to display as badges.
 * @param {function} [props.onFilterClick] - Callback function triggered when a filter badge is clicked.
 * @param {boolean} [props.disabled=false] - Disables the toggle switch if set to true.
 * @returns The rendered search bar with optional toggle and filters.
 */
export default function SearchBar({
                                      className,
                                      onRegisteredToggle,
                                      label = "Iscritto",
                                      showToggle = true,
                                      showFilters = true,
                                      filters = ["Filtro 1", "Filtro 2", "Filtro 3", "Filtro 4"],
                                      onFilterClick,
                                      disabled = false,
                                      ...props
                                  }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className={`w-full mx-auto space-y-4 ${className}`} {...props}>
            <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Cerca..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    </div>
                    {showToggle && (
                        <div className="ml-4 flex items-center space-x-2">
                            <Switch
                                onCheckedChange={onRegisteredToggle}
                                aria-label="Abilita ricerca API"
                                disabled={disabled}
                            />
                            <span className="text-sm text-muted-foreground">{label}</span>
                        </div>
                    )}
                </div>
            </form>
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
    )
}