/**
 * Saves authentication data to session storage.
 * @param {string} authToken - User authentication token
 * @param {string} [user] - Optional user data
 */

export const saveAuthData = (authToken: string, user?: string) => {
    sessionStorage.setItem('authToken', authToken);
    if (user) {
        sessionStorage.setItem('userData', JSON.stringify(user));
    }
};