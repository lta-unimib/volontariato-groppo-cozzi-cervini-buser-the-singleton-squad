
export interface RequestHeaderProps {
    title: string;
    organizationName: string;
    address: string;
    imageUrl: string;
    requestData: {
        categories?: string[];
    };
    role?: 'organization' | 'volunteer';
}