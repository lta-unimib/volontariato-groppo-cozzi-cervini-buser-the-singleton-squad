/**
 * Formats a website URL to ensure it includes the `https://` protocol.
 *
 * If the provided URL does not already start with `http://` or `https://`, the function adds `https://` at the beginning.
 * This ensures that the URL is properly formatted for making secure requests or displaying as a clickable link.
 *
 * @param {string} url - The website URL to format.
 * @returns The formatted URL, prefixed with `https://` if necessary.
 */
export const formatWebsiteUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};
