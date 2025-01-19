"use client";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useState, useEffect, useId } from "react";

interface RoundCheckboxSelectorProps {
    onChangeAction?: (selectedValues: string[]) => void;
    initialSelected?: string[];
}

export function RoundCheckboxSelector({ onChangeAction, initialSelected = [] }: RoundCheckboxSelectorProps) {
    const options = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    const componentId = useId();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected);

    useEffect(() => {
        setSelectedOptions(initialSelected);
    }, [initialSelected]);

    const handleCheckboxChange = (optionId: string) => {
        if (onChangeAction) {
            const updatedSelected = selectedOptions.includes(optionId)
                ? selectedOptions.filter((id) => id !== optionId)
                : [...selectedOptions, optionId];
            setSelectedOptions(updatedSelected);
            onChangeAction(updatedSelected);
        }
    };

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4">
                <ScrollArea className="h-28">
                    <div className="space-y-1">
                        {options.map((option) => {
                            const uniqueOptionId = `${componentId}-${option.id}`;
                            const isDisabled = !onChangeAction;
                            return (
                                <div key={uniqueOptionId} className="flex items-center space-x-2 py-2">
                                    <input
                                        type="checkbox"
                                        id={uniqueOptionId}
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => handleCheckboxChange(option.id)}
                                        className="hidden peer"
                                        aria-label={option.label}
                                        disabled={isDisabled}
                                    />
                                    <label
                                        htmlFor={uniqueOptionId}
                                        className={`relative w-4 h-4 rounded-full border border-gray-200 hover:border-gray-300 transition-colors peer-checked:border-primary flex items-center justify-center cursor-pointer ${
                                            isDisabled ? "cursor-not-allowed" : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                selectedOptions.includes(option.id) ? "bg-primary" : "bg-transparent"
                                            }`}
                                        ></div>
                                    </label>
                                    <Label
                                        htmlFor={uniqueOptionId}
                                        className={`cursor-pointer text-sm font-normal`}
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}