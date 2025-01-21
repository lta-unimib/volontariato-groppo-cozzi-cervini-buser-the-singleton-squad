"use client";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useState, useId } from "react";

interface RoundCheckboxSelectorProps {
    readonly onChangeAction?: (selectedValues: string[]) => void;
    readonly initialSelected?: string[];
    readonly readOnly?: boolean;
}

export function RoundCheckboxSelector({
                                          onChangeAction,
                                          initialSelected,
                                          readOnly = false
                                      }: RoundCheckboxSelectorProps) {
    const options = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    const componentId = useId();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected || []);

    const handleCheckboxChange = (optionId: string) => {
        if (readOnly) return;

        const updatedSelected = selectedOptions.includes(optionId)
            ? selectedOptions.filter((id) => id !== optionId)
            : [...selectedOptions, optionId];
        setSelectedOptions(updatedSelected);
        onChangeAction?.(updatedSelected);
    };

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4">
                <ScrollArea className="h-28">
                    <div className="space-y-1">
                        {options.map((option) => {
                            const uniqueOptionId = `${componentId}-${option.id}`;
                            const isSelected = selectedOptions.includes(option.id);

                            return (
                                <div
                                    key={uniqueOptionId}
                                    className={`flex items-center space-x-2 py-2 ${readOnly ? '' : 'cursor-pointer'}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={uniqueOptionId}
                                        checked={isSelected}
                                        onChange={() => handleCheckboxChange(option.id)}
                                        className="hidden peer"
                                        disabled={readOnly}
                                        aria-label={option.label}
                                    />
                                    <label
                                        htmlFor={uniqueOptionId}
                                        className={`relative w-4 h-4 rounded-full border ${
                                            readOnly
                                                ? isSelected
                                                    ? 'border-primary'
                                                    : 'border-gray-200'
                                                : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                                        } transition-colors peer-checked:border-primary flex items-center justify-center`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                isSelected ? "bg-primary" : "bg-transparent"
                                            }`}
                                        ></div>
                                    </label>
                                    <Label
                                        htmlFor={uniqueOptionId}
                                        className={`${readOnly ? '' : 'cursor-pointer'} text-sm font-normal`}
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