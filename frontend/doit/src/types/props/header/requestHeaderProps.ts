interface RequestHeaderProps {
    title: string;
    organizationName: string;
    address: string;
    imageUrl: string;
    requestData: {
        categories?: string[];
        [key: string]: any;
    };
    role?: 'organization' | 'volunteer';
}
