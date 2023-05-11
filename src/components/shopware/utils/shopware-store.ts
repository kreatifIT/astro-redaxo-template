import { atom } from 'nanostores';
import {
    ShopwareApiInstance,
    createInstance,
    getCustomer,
    getSessionContext,
} from '@shopware-pwa/shopware-6-client';
import { getSwCookies } from '../helpers/cookies';
import { setSwCookie } from '../helpers/client';

/** Shopware */
export const showOffcanvasStore = atom(false);
export const setShowOffcanvas = (show: boolean) => {
    showOffcanvasStore.set(show);
};

const cookies = getSwCookies();

let contextInstance: ShopwareApiInstance = createInstance({
    endpoint: 'https://sw.kreatif.it', //import.meta.env.SHOPWARE_ENDPOINT,
    accessToken: 'SWSCNWLLYWLHSW9OZ0QWDJJWCW', // import.meta.env.SHOPWARE_ACCESS_KEY,
    languageId: cookies?.swLangId,
    contextToken: cookies?.contextToken,
});

contextInstance.onConfigChange(({ config }) => {
    let contextInstance = ShopwareApiInstanceStore.get();
    if (contextInstance) {
        contextInstance.config = config;
        ShopwareApiInstanceStore.set(contextInstance);

        if (config.contextToken) {
            setSwCookie('sw-context-token', config.contextToken);
        }
    }
});

export const ShopwareApiInstanceStore = atom(contextInstance);
export const contextStore = atom();
export const customerStore = atom();
export const cartStore = atom(null);
export const customerWhistListStore = atom(null);
