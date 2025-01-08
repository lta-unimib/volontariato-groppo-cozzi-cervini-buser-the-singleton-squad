"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface RoundCheckboxSelectorProps {
    onChangeAction: (selectedValues: string[]) => void; // Renamed to onChangeAction
}

export function RoundCheckboxSelector({ onChangeAction }: RoundCheckboxSelectorProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = Array.from({ length: 100 }, (_, i) => ({
        id: `option${i + 1}`,
        label: `Option ${i + 1}`
    }));

    const handleCheckboxChange = (optionId: string) => {
        const updatedSelected = selectedOptions.includes(optionId)
            ? selectedOptions.filter((id) => id !== optionId)
            : [...selectedOptions, optionId];

        setSelectedOptions(updatedSelected);
        onChangeAction(updatedSelected); // Pass selected options to parent
    };

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4">
                <ScrollArea className={`h-28`}>
                    <div className="space-y-1">
                        {options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2 py-2">
                                <input
                                    type="checkbox"
                                    id={option.id}
                                    checked={selectedOptions.includes(option.id)}
                                    onChange={() => handleCheckboxChange(option.id)}
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor={option.id}
                                    className="relative w-4 h-4 rounded-full border border-gray-200 hover:border-gray-300 transition-colors peer-checked:border-primary flex items-center justify-center cursor-pointer"
                                >
                                    <div className={`w-2 h-2 rounded-full transition-colors ${selectedOptions.includes(option.id) ? 'bg-primary' : 'bg-transparent'}`}></div>
                                </label>
                                <Label htmlFor={option.id} className="cursor-pointer text-sm font-normal">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}