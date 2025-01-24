export interface Address {
    street: string;
    city: string;
    postalCode: string;
    number: string;
    additionalInfo: string;
}

export interface Organization {
    name: string;
    email: string;
    website: string;
    VATNumber: string;
}

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

export interface DetailedRequestData extends Request {
    role: 'volunteer' | 'organization';
}

export interface ApiResponse {
    message: string;
    data: Request[];
    status: number | string;
}