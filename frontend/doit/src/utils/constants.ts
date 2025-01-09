export const GITHUB_PAGES = process.env.GITHUB_PAGES === 'true';
export const REPOSITORY_NAME = process.env.REPOSITORY_NAME ?? '';
export const BASE_PATH = GITHUB_PAGES ? `/${REPOSITORY_NAME}` : '';
export const API_BASE_LINK = "https://ec2-3-64-126-237.eu-central-1.compute.amazonaws.com:8080"
