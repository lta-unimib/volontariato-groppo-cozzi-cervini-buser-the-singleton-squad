/**
 * Utility functions for formatting and handling dates.
 * - `formatDateRange`: formats a date range into a string.
 * - `dateUtils`: contains methods to generate date ranges and format individual dates.
 */

export const formatDateRange = (timeRange: [string, string]) => {
    const months = [
        'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
        'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];

    const [start, end] = timeRange.map(date => {
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    });

    return `${start} - ${end}`;
};

export const dateUtils = {
    getDateRange: (startDate: Date, endDate: Date) => {
        const dates = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    },

    formatDate: (date: Date) => {
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
};