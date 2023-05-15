export type RequestBody = Record<string, any>;
export default class ShopwareAdapter {
    private static BASE_URL = import.meta.env.PUBLIC_SHOPWARE_ENDPOINT;
    private static ACCESS_TOKEN = import.meta.env.PUBLIC_SHOPWARE_ACCESS_KEY;

    private static executeQuery(
        endpoint: string,
        body: RequestBody | undefined,
        contextToken: string,
        method: string,
        languageId: string,
    ): Promise<{ data: any; contextToken: string }> {
        return new Promise(async (resolve) => {
            endpoint = endpoint.replace(/^\//, '');
            const baseUrl = this.BASE_URL.replace(/\/$/, '');
            const _ = await fetch(`${baseUrl}/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'sw-access-key': this.ACCESS_TOKEN,
                    'sw-context-token': contextToken,
                    'sw-language-id': languageId,
                },
                body: JSON.stringify(body),
            });

            const resultData = await _.text();
            let data;
            if (resultData) data = JSON.parse(resultData);
            else data = {};

            resolve({
                data,
                contextToken: _.headers.get('sw-context-token')!,
            });
        });
    }

    public static get(
        endpoint: string,
        contextToken: string,
        languageId: string | undefined,
    ) {
        return this.executeQuery(
            endpoint,
            undefined,
            contextToken,
            'GET',
            languageId ? languageId : '',
        );
    }

    public static post(
        endpoint: string,
        body: RequestBody,
        contextToken: string,
        languageId: string,
    ) {
        return this.executeQuery(
            endpoint,
            body,
            contextToken,
            'POST',
            languageId,
        );
    }

    public static delete(
        endpoint: string,
        body: RequestBody,
        contextToken: string,
        languageId: string,
    ) {
        return this.executeQuery(
            endpoint,
            body,
            contextToken,
            'DELETE',
            languageId,
        );
    }

    public static patch(
        endpoint: string,
        body: RequestBody,
        contextToken: string,
        languageId: string,
    ) {
        return this.executeQuery(
            endpoint,
            body,
            contextToken,
            'PATCH',
            languageId,
        );
    }
}
export function changeDefaultPaymentMethod(
    paymentMethodId: string,
    contextToken: string,
    languageId: string,
) {
    return ShopwareAdapter.post(
        'store-api/account/change-payment-method/' + paymentMethodId,
        {},
        contextToken,
        languageId,
    );
}

export function searchProductsAdapter(
    term: string,
    contextToken: string,
    languageId: string,
    page: number,
    limit: number,
    postFilter: any,
    sorting: any,
) {
    return ShopwareAdapter.post(
        'store-api/search?search=' + term + '&p=' + page + '&limit=' + limit,
        {
            page: page,
            limit: limit,
            associations: {
                seoUrls: {},
                cover: {},
                manufacturer: {},
                properties: {},
                options: {},
            },
            'post-filter': postFilter,
            order: sorting,
        },
        contextToken,
        languageId,
    );
}
