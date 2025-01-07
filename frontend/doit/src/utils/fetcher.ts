import { mockAddresses, mockPlaces } from './mock';

const MOCK_AUTOCOMPLETE_ENDPOINT = "/api/address/mock-autocomplete";
const MOCK_PLACE_ENDPOINT = "/api/address/mock-place";

function isMockAutocompleteEndpoint(url: string): boolean {
    return url.includes(MOCK_AUTOCOMPLETE_ENDPOINT);
}

function isMockPlaceEndpoint(url: string): boolean {
    return url.includes(MOCK_PLACE_ENDPOINT);
}

function getPlaceIdFromUrl(url: string): string {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('placeId') || '';
}

export const fetcher = async (url: string): Promise<any> => {
    if (isMockAutocompleteEndpoint(url)) {
        return Promise.resolve({
            data: mockAddresses
        });
    }

    if (isMockPlaceEndpoint(url)) {
        const placeId = getPlaceIdFromUrl(url);
        const place = mockPlaces.find(p => p.placeId === placeId);

        if (place) {
            return Promise.resolve({
                data: place
            });
        }
    }

    // Otherwise perform the actual fetch
    const response = await fetch(url);
    return await response.json();
};