import type { RequestBody } from '.';
import ShopwareAdapter from '.';

export function addProductToWishlist(
    productId: string,
    contextToken: string,
    languageId: string,
) {
    ShopwareAdapter.post(
        '/store-api/customer/wishlist/add/' + productId,
        {},
        contextToken,
        languageId,
    );
}

export function removeProductFromWishlist(
    productId: string,
    contextToken: string,
    languageId: string,
) {
    ShopwareAdapter.delete(
        '/store-api/customer/wishlist/delete/' + productId,
        {},
        contextToken,
        languageId,
    );
}

export function getWishlist(contextToken: string, languageId: string) {
    return ShopwareAdapter.post(
        '/store-api/customer/wishlist',
        {},
        contextToken,
        languageId,
    );
}
