import { atom } from 'nanostores';

/** Shopware */
export const showOffcanvasStore = atom(false);
export const setShowOffcanvas = (show: boolean) => {
    showOffcanvasStore.set(show);
};

export const ShopwareApiInstanceStore = atom(null);
export const contextStore = atom(null);
export const customerStore = atom(null);
export const cartStore = atom(null);
export const customerWhistListStore = atom(null);
