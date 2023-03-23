import env from '@helpers/env.json';

export const getFullUrl = (url: string) => {
    if (url.startsWith('http')) {
        return url;
    }
    const baseUrl = env.ROOT.replace(/\/$/, '');
    url = url.replace(/^\//, '');
    return `${baseUrl}/${url}`;
};

export const getLogoUrl = () => {
    return getFullUrl('/img/logo.svg');
};
