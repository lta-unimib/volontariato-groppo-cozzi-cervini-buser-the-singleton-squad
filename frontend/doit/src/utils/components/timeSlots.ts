
export const timeSlots: string[] = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
);

export const weekDays: string[] = [
    'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì',
    'Venerdì', 'Sabato', 'Domenica'
];

export const getDisplayText = (
    mode: 'daily' | 'weekly' | 'monthly',
    timeRange: string[],
    weekDays: string[],
    dateRange: { from?: Date; to?: Date }
): string => {
    if (mode === 'daily' && timeRange.length === 2) {
        return `Daily: ${timeRange[0]} - ${timeRange[1]}`;
    }
    if (mode === 'weekly' && weekDays.length > 0) {
        return `Weekly: ${weekDays.length} giorni selezionati`;
    }
    if (mode === 'monthly' && dateRange?.from && dateRange?.to) {
        return `Monthly: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
    }
    return "Seleziona disponibilità";
};