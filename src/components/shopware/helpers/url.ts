export const getShopwareUrlByLang = (langCode: string, target: ShopwareURL) => {
    const targets = langToTarget.get(langCode);
    if (targets) {
        for (const [key, value] of targets) {
            if (value == target) {
                return (
                    '/' +
                    langCode +
                    '/shop/' +
                    (key.indexOf('/') == 0 ? key.substring(1) : key)
                );
            }
        }
    }
};

export enum ShopwareURL {
    SHOP_ROOT,
    REGISTRATION,
    CART,
    CHECKOUT,
    CHECKOUT_FINISHED,
    WHISHLIST,
    PASSWORD_RECOVERY,
    RESET_PASSWORD,
    USER_OVERVIEW,
    USER_PROFILE,
    USER_ADDRESSES,
    USER_ADDRESS_CREATE,
    USER_PAYMENTS,
    USER_ORDER,
    USER_ORDER_EDIT,
}

export const langToTarget = new Map<string, Map<string, ShopwareURL>>([
    [
        'de',
        new Map<string, any>([
            ['/', ShopwareURL.SHOP_ROOT],
            ['warenkorb', ShopwareURL.CART],
            ['checkout', ShopwareURL.CHECKOUT],
            ['checkout-finished', ShopwareURL.CHECKOUT_FINISHED],
            ['merkliste', ShopwareURL.WHISHLIST],
            ['recovery', ShopwareURL.PASSWORD_RECOVERY],
            ['registrierung', ShopwareURL.REGISTRATION],
            ['account/recover/password', ShopwareURL.RESET_PASSWORD],
            ['account/overview', ShopwareURL.USER_OVERVIEW],
            ['account/profile', ShopwareURL.USER_PROFILE],
            ['account/addresses', ShopwareURL.USER_ADDRESSES],
            ['account/address/create', ShopwareURL.USER_ADDRESS_CREATE],
            ['account/payment', ShopwareURL.USER_PAYMENTS],
            ['account/order', ShopwareURL.USER_ORDER],
            ['account/order/edit', ShopwareURL.USER_ORDER_EDIT],
            //todo: expand parser to allow wildcards {{articleSlug}} etc.
        ]),
    ],
    [
        'it',
        new Map<string, any>([
            ['/', ShopwareURL.SHOP_ROOT],
            ['registration', ShopwareURL.REGISTRATION],
            ['warenkorb', ShopwareURL.CART],
            ['checkout', ShopwareURL.CHECKOUT],
            ['checkout-finished', ShopwareURL.CHECKOUT_FINISHED],
            ['merkliste', ShopwareURL.WHISHLIST],
            ['recovery', ShopwareURL.PASSWORD_RECOVERY],
            ['account/recover/password', ShopwareURL.RESET_PASSWORD],
            ['account/overview', ShopwareURL.USER_OVERVIEW],
            ['account/profile', ShopwareURL.USER_PROFILE],
            ['account/addresses', ShopwareURL.USER_ADDRESSES],
            ['account/address/create', ShopwareURL.USER_ADDRESS_CREATE],
            ['account/payment', ShopwareURL.USER_PAYMENTS],
            ['account/order', ShopwareURL.USER_ORDER],
            ['account/order/edit', ShopwareURL.USER_ORDER_EDIT],
            //todo: expand parser to allow wildcards {{articleSlug}} etc.
        ]),
    ],
    [
        'en',
        new Map<string, any>([
            ['/', ShopwareURL.SHOP_ROOT],
            ['registration', ShopwareURL.REGISTRATION],
            ['cart', ShopwareURL.CART],
            ['checkout', ShopwareURL.CHECKOUT],
            ['checkout-finished', ShopwareURL.CHECKOUT_FINISHED],
            ['wishlist', ShopwareURL.WHISHLIST],
            ['recovery', ShopwareURL.PASSWORD_RECOVERY],
            ['account/recover/password', ShopwareURL.RESET_PASSWORD],
            ['account/overview', ShopwareURL.USER_OVERVIEW],
            ['account/profile', ShopwareURL.USER_PROFILE],
            ['account/addresses', ShopwareURL.USER_ADDRESSES],
            ['account/address/create', ShopwareURL.USER_ADDRESS_CREATE],
            ['account/payment', ShopwareURL.USER_PAYMENTS],
            ['account/order', ShopwareURL.USER_ORDER],
            ['account/order/edit', ShopwareURL.USER_ORDER_EDIT],
            //todo: expand parser to allow wildcards {{articleSlug}} etc.
        ]),
    ],
]);
