export const GITHUB_PAGES = process.env.GITHUB_PAGES === 'true';
export const REPOSITORY_NAME = process.env.REPOSITORY_NAME ?? '';
export const BASE_PATH = GITHUB_PAGES ? `/${REPOSITORY_NAME}` : '';
