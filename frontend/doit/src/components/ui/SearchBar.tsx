"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Switch } from "@/components/ui/Switch"
import { Badge } from "@/components/ui/Badge"

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    onRegisteredToggle?: (enabled: boolean) => void;
    label?: string;
}

export default function SearchBar({ className, onRegisteredToggle, label = "Iscritto", ...props }: SearchBarProps) {
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
                    <div className="ml-4 flex items-center space-x-2">
                        <Switch onCheckedChange={onRegisteredToggle} aria-label="Abilita ricerca API" />
                        <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                </div>
            </form>
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer font-normal hover:bg-muted">
                    Filtro 1
                </Badge>
                <Badge variant="outline" className="cursor-pointer font-normal hover:bg-muted">
                    Filtro 2
                </Badge>
                <Badge variant="outline" className="cursor-pointer font-normal hover:bg-muted">
                    Filtro 3
                </Badge>
                <Badge variant="outline" className="cursor-pointer font-normal hover:bg-muted">
                    Filtro 4
                </Badge>
            </div>
        </div>
    )
}
