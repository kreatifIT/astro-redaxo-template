import type { RequestBody } from '.';
import ShopwareAdapter from '.';

export function getShippingMethods(contextToken: string, languageId: string) {
    return ShopwareAdapter.get(
        '/store-api/shipping-method',
        contextToken,
        languageId,
    );
}

export function getContext(contextToken: string, languageId: string) {
    return ShopwareAdapter.get('/store-api/context', contextToken, languageId);
}

export function updateContext(
    body: RequestBody,
    contextToken: string,
    languageId: string,
) {
    return ShopwareAdapter.patch(
        '/store-api/context',
        body,
        contextToken,
        languageId,
    );
}
