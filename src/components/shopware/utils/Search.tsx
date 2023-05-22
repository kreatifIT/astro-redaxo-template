import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from './shopware-store';
import ProductBox from '../atoms/ProduktBox';
import ProductSorting from '../atoms/ProductSorting';
import { productSearchFilter } from '../helpers/product';
import ManufacturerFilter from '../atoms/ManufacturerFilter';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';
import Filter from '../atoms/Filter';

interface Props {
    limit: number;
    results: any;
    searchParam: string;
}

export default function Search({ limit, results, searchParam }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [page, setPage] = useState(1);
    const [searchResult, setSearchResult] = useState(results);
    const [filter, setFilter] = useState(results?.currentFilters);
    const [currentSorting, setCurrentSorting] = useState(results?.sorting);
    const [total, setTotal] = useState(results?.total);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const step = limit;
    const param = searchParam;
    const sortings = results?.availableSortings;
    const filters = results?.aggregations;

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

    useEffect(() => {
        if (searchParam) {
            productSearchFilter(
                searchParam,
                contextInstance,
                filter,
                page,
                step,
                currentSorting,
            ).then((response: any) => {
                setTotal(response.total);
                setSearchResult(response);
            });
        }
    }, [page, currentSorting, filter]);

    return (
        <div class="search__container">
            {searchResult?.total > 0 ? (
                <>
                    <div class="mb-10 w-[100%] text-center">
                        <h2>
                            {t('search_result_total')
                                .replace('%total%', results.total)
                                .replace('%param%', param)}
                        </h2>
                    </div>
                    <div class="flex w-full flex-row flex-wrap">
                        <div class="w-[25%] pr-5">
                            <div class="mb-10">
                                <ProductSorting
                                    sortings={sortings}
                                    currentSorting={currentSorting}
                                    setCurrentSorting={setCurrentSorting}
                                />
                            </div>
                            <div class="">
                                <div class="py-5">
                                    <ManufacturerFilter
                                        filters={filters}
                                        addFilter={addFilter}
                                    />
                                </div>

                                <Filter
                                    filters={filters}
                                    addFilter={addFilter}
                                />
                            </div>
                        </div>
                        <div class="w-[75%] pl-10">
                            <div>
                                <div class="flex w-full flex-row flex-wrap">
                                    {searchResult.elements.map(
                                        (product: any) => (
                                            <ProductBox product={product} />
                                        ),
                                    )}
                                </div>
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
                </>
            ) : (
                <div class="mb-10 w-[100%] text-center">
                    <h2>Zu "{param}" wurden 0 Produkte gefunden</h2>
                </div>
            )}
        </div>
    );
}
