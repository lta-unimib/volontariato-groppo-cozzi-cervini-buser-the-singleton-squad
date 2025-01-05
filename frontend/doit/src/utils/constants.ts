export const GITHUB_PAGES = process.env.GITHUB_PAGES === 'true';
export const REPOSITORY_NAME =  "volontariato-groppo-cozzi-cervini-buser-the-singleton-squad";
export const BASE_PATH = GITHUB_PAGES ? `/${REPOSITORY_NAME}` : '';
