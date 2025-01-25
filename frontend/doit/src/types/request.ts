/**
 * Rappresenta un indirizzo fisico.
 */
export interface Address {
    street: string;
    city: string;
    postalCode: string;
    number: string;
    additionalInfo: string;
}

/**
 * Rappresenta un'organizzazione.
 */
export interface Organization {
    name: string;
    organizationName: string;
    email: string;
    website: string;
    VATNumber: string;
    city: string;
    preferences: string[];
    description: string;
}

export interface Volunteer {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    description: string;
    preferences: string[];
    availability: string;
}

/**
 * Rappresenta una richiesta di volontariato.
 */
export interface Request {
    id: string;
    title: string;
    description: string;
    volunteerCapacity: string;
    address: Address;
    startTime: string;
    endTime: string;
    organization: Organization;
    categories: string[];
    timeRange: [string, string];
}

/**
 * Dati della richiesta con il ruolo specificato (volontario od organizzazione).
 */
export interface DetailedRequestData extends Request {
    role: 'volunteer' | 'organization';
}

export interface DetailedOrganizationData extends Organization {
    role: 'volunteer' | 'organization';
}

export interface DetailedVolunteerData extends Volunteer {
    role: 'volunteer' | 'organization';
}

/**
 * Risposta dell'API contenente il risultato della richiesta.
 */
export interface ApiResponse {
    message: string;
    data: Request[];
    status: number | string;
}