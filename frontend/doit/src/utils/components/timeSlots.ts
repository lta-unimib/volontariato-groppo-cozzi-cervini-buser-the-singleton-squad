/**
 * Generates an array of time slots for 24 hours in the format "00:00", "01:00", ..., "23:00".
 * @type {string[]}
 */
export const timeSlots: string[] = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
);

/**
 * Array of days in Italian for the week.
 * @type {string[]}
 */
export const weekDays: string[] = [
    'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì',
    'Venerdì', 'Sabato', 'Domenica'
];

/**
 * Returns a display text based on the selected mode (daily, weekly, monthly) and the corresponding date/time range.
 *
 * @param {('daily' | 'weekly' | 'monthly')} mode - The display mode for the availability.
 * @param {string[]} timeRange - The selected time range for daily or weekly display.
 * @param {string[]} weekDays - The selected weekdays for weekly display.
 * @param {{ from?: Date; to?: Date }} dateRange - The selected date range for monthly display.
 * @returns {string} The formatted display text based on the mode and selection.
 */
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