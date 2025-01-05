import { BASE_PATH } from '@/utils/constants';

export const useBasePath = () => {
    const basePath = BASE_PATH || '';
    console.log('Computed BASE_PATH:', basePath);
    return basePath;
};