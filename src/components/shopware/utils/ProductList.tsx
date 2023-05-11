// TODO
// AddToCart meldung einbauen wenn OK & Fehlermeldung wenn nicht OK
// Filter kontrollieren ob diese kombinierbar sind ?

import { useEffect, useState } from 'preact/hooks';
import AddToCart from '../atoms/AddToCart';
import ProductWhistlist from '../atoms/ProductWhistlist';
import {
    formatPrice,
    getClangCodeFromCookie,
    getShopwareUrl,
    getThumbnail,
} from '../helpers/client';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import { ShopwareURL } from '../helpers/url';
import { getCategoryProducts } from '@shopware-pwa/shopware-6-client';
import useTranslations from '@helpers/translations/client';

interface Props {
    productStep: number;
    productListing: any;
    clangCode: string;
}

export default function ProductList({ productStep, productListing }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const customer = useStore(customerStore);

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState(productListing.elements);
    const [filter, setFilter] = useState(productListing.currentFilters);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const [currentSorting, setCurrentSorting] = useState(
        productListing.sorting,
    );
    const step = productStep;
    const total = productListing.total;
    const sortings = productListing.availableSortings;
    const filters = productListing.aggregations;

    // add selected filter to filter object
    const addFilter = (e: any) => {
        if (e.target.checked) {
            setFilter({
                ...filter,
                [e.target.name]: [...filter[e.target.name], e.target.value],
            });
        } else {
            setFilter({
                ...filter,
                [e.target.name]: filter[e.target.name].filter(
                    (item: any) => item !== e.target.value,
                ),
            });
        }
    };

    // useEffect only on click on next or prev
    useEffect(() => {
        let postFilter: any = [];
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

        const fetchData = async (
            contextInstance: any,
            page: number,
            productStep: number,
            sorting: any,
            postFilter: any,
            setProducts: (arg0: any) => void,
        ) => {
            let _respons = await getCategoryProducts(
                productListing.currentFilters.navigationId,
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
            setProducts(_respons.elements);
        };
        if (contextInstance) {
            fetchData(
                contextInstance,
                page,
                productStep,
                currentSorting,
                postFilter,
                setProducts,
            );
        }
    }, [page, currentSorting, filter]);

    return (
        <>
            <div class="row">
                <div class="flex w-full flex-row flex-wrap">
                    <div class="w-[25%] pr-5">
                        <h2 class="mb-5 border-b pb-2">Sorting</h2>
                        <select
                            class="mb-5 w-full rounded border border-gray-300 p-2"
                            onChange={(e) =>
                                setCurrentSorting(e?.target?.value)
                            }
                        >
                            {sortings?.map((sorting: any) => (
                                <option
                                    value={sorting.key}
                                    selected={sorting.key === currentSorting}
                                >
                                    {sorting.translated.label}
                                </option>
                            ))}
                        </select>

                        <div class="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                            <div class="py-5">
                                <details class="group">
                                    <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                                        <span>{t('manufacturer')}</span>
                                        <span class="transition group-open:rotate-180">
                                            <svg
                                                fill="none"
                                                height="24"
                                                shape-rendering="geometricPrecision"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                viewBox="0 0 24 24"
                                                width="24"
                                            >
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </summary>
                                    <div class="py-5">
                                        {filters.manufacturer?.entities.map(
                                            (manfuacturer: any) => (
                                                <div class="p-2">
                                                    <input
                                                        type="checkbox"
                                                        name="manufacturer"
                                                        value={manfuacturer.id}
                                                        id={
                                                            'manufacturer' +
                                                            manfuacturer.id
                                                        }
                                                        onChange={(e) =>
                                                            addFilter(e)
                                                        }
                                                    />
                                                    <label
                                                        for={
                                                            'manufacturer' +
                                                            manfuacturer.id
                                                        }
                                                        class="ml-2"
                                                    >
                                                        {
                                                            manfuacturer
                                                                .translated.name
                                                        }
                                                    </label>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </details>
                            </div>

                            {filters.properties?.entities?.map(
                                (property: any) => (
                                    <div class="py-5">
                                        <details class="group">
                                            <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                                                <span>
                                                    {property.translated.name}
                                                </span>
                                                <span class="transition group-open:rotate-180">
                                                    <svg
                                                        fill="none"
                                                        height="24"
                                                        shape-rendering="geometricPrecision"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="1.5"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </summary>
                                            <div class="mt-5">
                                                {property.options.map(
                                                    (option: any) => (
                                                        <div class="p-2">
                                                            <input
                                                                type="checkbox"
                                                                name="properties"
                                                                value={
                                                                    option.id
                                                                }
                                                                id={
                                                                    'property' +
                                                                    option.id
                                                                }
                                                                onChange={(e) =>
                                                                    addFilter(e)
                                                                }
                                                            />
                                                            <label
                                                                for={
                                                                    'property' +
                                                                    option.id
                                                                }
                                                                class="ml-2"
                                                            >
                                                                {
                                                                    option
                                                                        .translated
                                                                        .name
                                                                }
                                                            </label>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </details>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                    <div class="w-[75%] pl-10">
                        <div class="flex w-full flex-row flex-wrap">
                            {products.map((product: any) => (
                                <div key={product.id} class=" w-1/3  p-3">
                                    <div class="relative border p-2">
                                        <a
                                            href={
                                                getShopwareUrl(
                                                    ShopwareURL.SHOP_ROOT,
                                                ) +
                                                product.seoUrls[0].seoPathInfo
                                            }
                                            title={product.translated.name}
                                        >
                                            <img
                                                src={getThumbnail(
                                                    product.cover.media,
                                                    400,
                                                    400,
                                                )}
                                                alt={
                                                    product.cover.media.alt
                                                        ? product.cover.media
                                                              .alt
                                                        : product.cover.media
                                                              .fileName
                                                }
                                            />

                                            <p class="font-bold">
                                                {product.translated.name}
                                            </p>

                                            {product.calculatedCheapestPrice
                                                .hasRange ? (
                                                <>
                                                    <p class="text-right">
                                                        Ab
                                                        {formatPrice(
                                                            product
                                                                .calculatedCheapestPrice
                                                                .unitPrice,
                                                        )}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p class="text-right">
                                                        {formatPrice(
                                                            product
                                                                .calculatedPrice
                                                                .unitPrice,
                                                        )}
                                                    </p>
                                                </>
                                            )}
                                        </a>
                                        {customer ? (
                                            <>
                                                <AddToCart
                                                    product={product}
                                                    showQuantity={false}
                                                />

                                                <ProductWhistlist
                                                    productId={product.id}
                                                    setLoading={undefined}
                                                />
                                            </>
                                        ) : (
                                            <div class="bg-red-600 p-2 text-center text-white">
                                                {t('login_to_add_to_cart')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="text-center">
                            {page > 1 && (
                                <button
                                    onClick={() => setPage(page - 1)}
                                    class="mr-2"
                                >
                                    {t('pagination_next')}
                                </button>
                            )}
                            {page < total / step && (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    class="ml-2"
                                >
                                    {t('pagination_previous')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
