import type { AstroGlobal } from 'astro';
import {
    ShopwareApiInstance,
    createInstance,
    getCustomer,
    getSeoUrl,
    getSessionContext,
} from '@shopware-pwa/shopware-6-client';
import { ShopwareURL, getShopwareUrlByLang, langToTarget } from './url';

import ProductList from '@components/shopware/modules/ProductList.astro';
import ProductDetail from '@components/shopware/modules/ProductDetail.astro';
import Wishlist from '@components/shopware/modules/Whishlist.astro';
import Cart from '@components/shopware/modules/Cart.astro';
import Checkout from '@components/shopware/modules/Checkout.astro';
import CheckoutFinished from '@components/shopware/modules/CheckoutFinished.astro';

import PasswordRecovery from '@components/shopware/modules/PasswordRecovery.astro';
import ResetPassword from '@components/shopware/modules/ResetPassword.astro';
import UserOverview from '@components/shopware/modules/UserOverview.astro';
import UserProfile from '@components/shopware/modules/UserProfile.astro';
import UserAddress from '@components/shopware/modules/UserAddress.astro';
import UserAddressCreate from '@components/shopware/modules/UserAddressCreate.astro';
import UserPayments from '@components/shopware/modules/UserPayments.astro';
import UserOrder from '@components/shopware/modules/UserOrder.astro';
import UserOrderEdit from '@components/shopware/modules/UserOrderEdit.astro';
import Registration from '@components/shopware/modules/Registration.astro';
import Search from '@components/shopware/modules/Search.astro';

import { getClangId } from '@helpers/cookies';

export const parseEnvironmentMapping = (
    mapping: string,
    key: string,
): string => {
    return (
        mapping
            .split(',')
            ?.find((m) => m.split(':')[0] === key)
            ?.split(':')[1] || ''
    );
};

export const initShopwareSite = async (
    Astro: AstroGlobal,
    path: string,
    lang: string,
) => {
    Astro.cookies.set('clangCode', lang, { path: '/' });

    const clangId = parseEnvironmentMapping(
        import.meta.env.CODE_CLANG_MAPPING,
        lang,
    );

    if (!clangId) throw new Error('Clang ID not found in environment mapping');

    const swLang = parseEnvironmentMapping(
        import.meta.env.SW_LANG_MAPPING,
        clangId,
    );

    const clangCode = parseEnvironmentMapping(
        import.meta.env.CODE_CLANG_MAPPING,
        clangId,
    );

    if (!swLang) throw new Error('SW Lang ID not found in environment mapping');

    let contextToken = Astro.cookies.get('sw-context-token').value;

    const contextInstance: ShopwareApiInstance = createInstance({
        endpoint: import.meta.env.SHOPWARE_ENDPOINT,
        accessToken: import.meta.env.SHOPWARE_ACCESS_KEY,
        languageId: swLang,
        contextToken: contextToken ? contextToken : undefined,
    });
    const sessionContext = await getSessionContext(contextInstance);

    Astro.cookies.set(
        'sw-context-token',
        contextInstance.config.contextToken
            ? contextInstance.config.contextToken
            : '',
        {
            path: '/',
        },
    );
    Astro.cookies.set(
        'sw-language-id',
        contextInstance.config.languageId
            ? contextInstance.config.languageId
            : '',
        {
            path: '/',
        },
    );

    Astro.cookies.set('context', sessionContext, { path: '/' });

    const customer = await getCustomer(
        {
            associations: {
                defaultBillingAddress: {
                    associations: {
                        country: {},
                    },
                },
                defaultShippingAddress: {
                    associations: {
                        country: {},
                    },
                },
                addresses: {
                    associations: {
                        country: {},
                    },
                },
                defaultPaymentMethod: {},
            },
        },
        contextInstance as ShopwareApiInstance,
    ).catch((e) => {
        return undefined;
    });

    let component = getShopwareComponent(path, lang);
    let itemId = null;

    if (!component) {
        // Mehrsprachig?
        if (path.includes('account/order')) {
            const pathArray = path.split('/');
            itemId = pathArray[pathArray.length - 1];
            component = getShopwareComponent('account/order', lang);
        }
    }

    // Mehrsprachig?
    if (!path.includes('recover/password')) {
        if (
            (path.includes('account') && customer == null) ||
            (path.includes('checkout') && customer == null)
        ) {
            // wenn user objekt nicht vorhanden und im pfad ist "account" dann auf die Startseite weiterleiten
            return {
                component: null,
                data: '/',
                contextInstance,
                sessionContext,
                customer,
                itemId: null,
                redirect: '/',
            };
        }
    }

    if (component) {
        return {
            component,
            undefined,
            contextInstance,
            sessionContext,
            customer,
            itemId: itemId,
        };
    }

    // Kategorien brauchen enden Slash und Produkte nicht .....
    const _seoUrl = await getSeoUrl(
        {
            filter: [
                {
                    type: 'multi',
                    operator: 'OR',
                    queries: [
                        {
                            type: 'equals',
                            field: 'seoPathInfo',
                            value: path + '/',
                        },
                        {
                            type: 'equals',
                            field: 'seoPathInfo',
                            value: path,
                        },
                    ],
                },
            ],
        },
        contextInstance,
    );

    if (_seoUrl.total == 0) {
        // todo: handle 404
        return {
            component: ProductList,
            data: path,
            contextInstance,
            sessionContext,
            customer,
            itemId: null,
        };
    } else if (_seoUrl.elements[0].routeName == 'frontend.detail.page') {
        const productId = _seoUrl.elements[0].foreignKey;

        return {
            component: ProductDetail,
            data: path,
            contextInstance,
            sessionContext,
            customer,
            itemId: productId,
        };
    } else if (_seoUrl.elements[0].routeName == 'frontend.navigation.page') {
        const categoryId = _seoUrl.elements[0].foreignKey;
        return {
            component: ProductList,
            data: path,
            contextInstance,
            sessionContext,
            customer,
            itemId: categoryId,
        };
    } else {
        throw new Error('No component found for this path: ' + path);
    }
};

const getShopwareComponent = (path: string, lang: string) => {
    let completePath = targetToComponent.get(
        langToTarget.get(lang)?.get(path)!,
    );

    if (completePath != undefined) {
        return completePath;
    }

    const pathArray = path.split('/');
    completePath = targetToComponent.get(
        langToTarget.get(lang)?.get(pathArray[0])!,
    );
    if (completePath != undefined) {
        return completePath;
    }
};
const targetToComponent = new Map<ShopwareURL, any>([
    [ShopwareURL.SHOP_ROOT, ProductList],
    [ShopwareURL.REGISTRATION, Registration],
    [ShopwareURL.CART, Cart],
    [ShopwareURL.CHECKOUT, Checkout],
    [ShopwareURL.CHECKOUT_FINISHED, CheckoutFinished],
    [ShopwareURL.WHISHLIST, Wishlist],
    [ShopwareURL.PASSWORD_RECOVERY, PasswordRecovery],
    [ShopwareURL.RESET_PASSWORD, ResetPassword],
    [ShopwareURL.USER_OVERVIEW, UserOverview],
    [ShopwareURL.USER_PROFILE, UserProfile],
    [ShopwareURL.USER_ADDRESSES, UserAddress],
    [ShopwareURL.USER_ADDRESS_CREATE, UserAddressCreate],
    [ShopwareURL.USER_PAYMENTS, UserPayments],
    [ShopwareURL.USER_ORDER, UserOrder],
    [ShopwareURL.USER_ORDER_EDIT, UserOrderEdit],
    [ShopwareURL.SEARCH, Search],
]);

export const getShopwareUrlByAstro = (
    Astro: AstroGlobal,
    target: ShopwareURL,
) => {
    const lang = getClangId(Astro);
    return getShopwareUrlByLang(lang, target);
};