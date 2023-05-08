import { getProperty } from '@helpers/properties-management/client-properties';
import { ShopwareURL, getShopwareUrlByLang } from './url';

export const getShopwareUrl = (target: ShopwareURL) => {
    if (typeof window === 'undefined') return;
    let clangCode = getClangCodeFromCookie();
    return getShopwareUrlByLang(clangCode, target);
};

// get Thumbnail
export const getThumbnail = (media: any, width: number, height: number) => {
    if (!media) return;
    let url = media.url,
        currentHeight = 0,
        currentWidth = 0;

    media.thumbnails.map((thumbnail: any) => {
        if (
            thumbnail.width <= width &&
            thumbnail.width > currentWidth &&
            thumbnail.height <= height &&
            thumbnail.height > currentHeight
        ) {
            currentHeight = thumbnail.height;
            currentWidth = thumbnail.width;
            url = thumbnail.url;
        }
    });

    return url;
};

export const getSwCookies = () => {
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

export const getClangCodeFromCookie = () => {
    const cookies = document?.cookie.split(';');
    let clangCode = '';

    cookies.forEach((cookie) => {
        if (cookie.includes('clangCode')) {
            clangCode = cookie.split('=')[1];
        }
    });

    return clangCode;
};

export const setSwCookie = (key: string, value: string) => {
    document.cookie = `${key}=${value};path=/`;
};
