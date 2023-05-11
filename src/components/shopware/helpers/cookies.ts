export const getSwCookies = () => {
    if (typeof document === 'undefined') return;
    const cookies = document?.cookie.split(';');
    let contextToken = '';
    let swLangId = '';

    cookies.forEach((cookie) => {
        if (cookie.includes('sw-context-token')) {
            contextToken = cookie.split('=')[1];
        }
        if (cookie.includes('sw-language-id')) {
            swLangId = cookie.split('=')[1];
        }
    });

    return { contextToken, swLangId };
};
