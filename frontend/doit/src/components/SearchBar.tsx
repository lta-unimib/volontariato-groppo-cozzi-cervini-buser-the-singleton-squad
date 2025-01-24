"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Switch } from "@/components/core/Switch"
import { Badge } from "@/components/core/Badge"
import {SearchBarProps} from "@/types/props/searchBarProps";

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