// TODO
// AddToCart meldung einbauen wenn OK & Fehlermeldung wenn nicht OK
// Filter kontrollieren ob diese kombinierbar sind ?

import { useEffect, useState } from 'preact/hooks';
import { getClangCodeFromCookie } from '../helpers/client';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore } from './shopware-store';
import useTranslations from '@helpers/translations/client';
import ProductBox from '../atoms/ProduktBox';
import ProductSorting from '../atoms/ProductSorting';
import { productListFilter } from '../helpers/product';
import ManufacturerFilter from '../atoms/ManufacturerFilter';
import Filter from '../atoms/Filter';

interface Props {
    currentPage: number;
    productStep: number;
    productListing: any;
}

export default function ProductList({
    currentPage,
    productStep,
    productListing,
}: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [page, setPage] = useState(currentPage);
    const [products, setProducts] = useState(productListing.elements);
    const [filter, setFilter] = useState(productListing.currentFilters);
    const [total, setTotal] = useState(productListing.total);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const [currentSorting, setCurrentSorting] = useState(
        productListing.sorting,
    );
    const step = productStep;

    const sortings = productListing.availableSortings;
    const filters = productListing.aggregations;

    // add selected filter to filter object
    const addFilter = (e: any) => {
        setPage(1);
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

    useEffect(() => {
        productListFilter(
            contextInstance,
            productListing.currentFilters.navigationId,
            filter,
            page,
            step,
            currentSorting,
        ).then((response: any) => {
            setProducts(response.elements);
            setTotal(response.total);
        });

        // TODO: add filter to url
        history.pushState(null, '', `?page=${page}`);
    }, [page, currentSorting, filter]);

    return (
        <>
            <div class="row">
                <div class="flex w-full flex-row flex-wrap">
                    <div class="w-[25%] pr-5">
                        <ProductSorting
                            sortings={sortings}
                            currentSorting={currentSorting}
                            setCurrentSorting={setCurrentSorting}
                        />

                        <div class="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                            <div class="py-5">
                                <ManufacturerFilter
                                    filters={filters}
                                    addFilter={addFilter}
                                />
                            </div>

                            <Filter filters={filters} addFilter={addFilter} />
                        </div>
                    </div>
                    <div class="w-[75%] pl-10">
                        <div class="flex w-full flex-row flex-wrap">
                            {products.map((product: any) => (
                                <ProductBox product={product} />
                            ))}
                        </div>
                        <div class="text-center">
                            {page > 1 && (
                                <button
                                    onClick={() => setPage(page - 1)}
                                    class="mr-2"
                                >
                                    {t('pagination_prev')}
                                </button>
                            )}
                            {page < total / step && (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    class="ml-2"
                                >
                                    {t('pagination_next')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
