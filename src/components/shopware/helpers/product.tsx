import {
    getCategoryProducts,
    searchProducts,
} from '@shopware-pwa/shopware-6-client';

export function generateFilter(postFilter: any, filter: any) {
    if (filter.manufacturer.length) {
        postFilter.push({
            type: 'equalsAny',
            field: 'product.manufacturerId',
            value: filter.manufacturer,
        });
    }
    let multiFilter = [];
    if (filter.properties.length) {
        multiFilter = filter.properties.map((property: any) => ({
            type: 'multi',
            operator: 'OR',
            queries: [
                {
                    type: 'equalsAny',
                    field: 'product.propertyIds',
                    value: [property],
                },
                {
                    type: 'equalsAny',
                    field: 'product.optionIds',
                    value: [property],
                },
            ],
        }));
        postFilter.push({
            type: 'multi',
            operator: 'and',
            queries: multiFilter,
        });
    }
    return postFilter;
}

export async function productListFilter(
    contextInstance: any,
    navigationId: string,
    filter: any,
    page: number,
    productStep: number,
    sorting: any,
) {
    let postFilter: any = [];
    generateFilter(postFilter, filter);

    if (contextInstance) {
        let _respons = await getCategoryProducts(
            navigationId,
            {
                p: page,
                limit: productStep,
                order: sorting,
                'total-count-mode': 1,
                associations: {
                    seoUrls: ['id', 'pathInfo'],
                    categories: ['id'],
                },
                'post-filter': postFilter,
            },
            contextInstance as any,
        );
        return _respons.elements;
    }
}

export async function productSearchFilter(
    searchParam: string,
    contextInstance: any,
    filter: any,
    page: number,
    productStep: number,
    sorting: any,
) {
    let postFilter: any = [];
    generateFilter(postFilter, filter);


    // add page to queryparams 
    

    const _response = await searchProducts(
        {
            query: searchParam,
            page: page,
            limit: productStep,
            order: sorting,
            'total-count-mode': 1,
            'post-filter': postFilter,
        },
        contextInstance as any,
    );

    return _response;
}
