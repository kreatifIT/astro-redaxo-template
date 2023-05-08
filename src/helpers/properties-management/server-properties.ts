import type { ShopwareApiInstance } from '@shopware-pwa/shopware-6-client';
import type { AstroAdapter, AstroGlobal } from 'astro';

export const setProperty = (Astro: any, key: string, value: string) => {
    if (!Astro.request.states) Astro.request.states = new Map<string, any>();
    Astro.request.states.set(key, value);
};

export const getProperty = (Astro: AstroGlobal, key: string) => {
    //@ts-ignore
    if (Astro.request.states && Astro.request.states.has(key))
        //@ts-ignore
        return Astro.request.states.get(key);
    return null;
};

export const getAllProperties = (Astro: AstroGlobal) => {
    //@ts-ignore
    if (Astro.request.states) {
        //convert map to object
        const obj: any = {};
        //@ts-ignore
        Astro.request.states.forEach((value: any, key: string) => {
            obj[key] = value;
        });
        return obj;
    }
    return {};
};

export const getClangId = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'clangId');
};

export const setClangId = (Astro: AstroGlobal, clangId: string) => {
    setProperty(Astro, 'clangId', clangId);
};

/** Shopware **/
export const getCategoryId = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'categoryId');
};

export const setCategoryId = (Astro: AstroGlobal, categoryId: string) => {
    setProperty(Astro, 'categoryId', categoryId);
};
export const setClangCode = (Astro: AstroGlobal, clangCode: string) => {
    setProperty(Astro, 'clangCode', clangCode);
};

export const getClangCode = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'clangCode');
};

export const setShopwareInstance = (
    Astro: AstroGlobal,
    value: ShopwareApiInstance,
) => {
    //@ts-ignore
    Astro.request.swApiInstance = value;
};
export const getShopwareInstance = (Astro: AstroGlobal) => {
    //@ts-ignore
    return Astro.request.swApiInstance;
};

export const setCustomer = (Astro: AstroGlobal, value: any) => {
    setProperty(Astro, 'customer', value);
};
export const getCustomer = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'customer');
};

export const setContext = (Astro: AstroGlobal, value: any) => {
    setProperty(Astro, 'context', value);
};
export const getContext = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'context');
};
