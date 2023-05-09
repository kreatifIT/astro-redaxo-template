import { useStore } from '@nanostores/preact';
import { ShopwareURL, getShopwareUrlByLang } from './url';
import { contextStore } from '../utils/shopware-store';

export const getShopwareUrl = (target: ShopwareURL, params?: an) => {
    if (typeof window === 'undefined') return;
    const clangCode = getClangCodeFromCookie();
    let url = getShopwareUrlByLang(clangCode, target);

    if (params) {
        url = `${url}?${new URLSearchParams(params).toString()}`;
    }
    return url;
};

// get Thumbnail
export const getThumbnail = (media: any, width: number, height: number) => {
    if (typeof document === 'undefined') return;

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

export const formatPrice = (price: number | undefined) => {
    if (typeof Intl === 'undefined') return price;

    const context = useStore(contextStore);

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency:
            context && context.currency.isoCode
                ? context.currency.isoCode
                : 'EUR',
    });

    return formatter.format(price);
};

export const getClangCodeFromCookie = () => {
    if (typeof document === 'undefined') return;

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
