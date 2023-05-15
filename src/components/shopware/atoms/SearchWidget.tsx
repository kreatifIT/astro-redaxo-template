import { searchSuggestedProducts } from '@shopware-pwa/shopware-6-client';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from '../utils/shopware-store';
import { useStore } from '@nanostores/preact';
import { getClangCodeFromCookie, getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import useTranslations from '@helpers/translations/client';

export default function SearchWidget() {
    const searchLimit = 8;
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const [searchResult, setSearchResult] = useState<any>([]);
    const [showResults, setShowResults] = useState(false);
    const [searchParam, setSearchParam] = useState('');

    const clangCode = getClangCodeFromCookie();

    const t = useTranslations(clangCode, 'shopware');

    const handleChange = async (event: any) => {
        const search = event.target.value;

        // mindestens 3 zeichen
        if (search && search.length >= 3) {
            setSearchParam(search);
            const searchResponse = await searchSuggestedProducts(
                {
                    query: search,
                    limit: searchLimit,
                    'total-count-mode': 1,
                },
                contextInstance as any,
            );
            setSearchResult(searchResponse);
            setShowResults(true);
        } else {
            setSearchParam('');
            setSearchResult([]);
            setShowResults(false);
        }
    };

    const onFocusOut = () => {
        //setShowResults(false);
    };

    const onFocusIn = () => {
        //setShowResults(true);
    };

    const onSubmit = (e: any) => {
        const formData = new FormData(e.target);
        const searchParam = formData.get('searchParam');

        if (searchParam && searchParam.length <= 3) {
            e.preventDefault();
            return false;
        }
    };

    return (
        <div
            class="search relative"
            onfocusout={onFocusOut}
            onfocusin={onFocusIn}
        >
            <form
                action={getShopwareUrl(ShopwareURL.SEARCH)}
                method="GET"
                onSubmit={(e) => onSubmit(e)}
            >
                <input
                    type="text"
                    class="search__input border-2 border-black"
                    placeholder="Suche"
                    name="search"
                    onInput={handleChange}
                />
            </form>

            {showResults && (
                <div className="search_result absolute border border-black bg-white">
                    {searchResult?.elements?.length === 0 ? (
                        <div class="p-2">
                            {t('suggest_search_result_no_result')}
                        </div>
                    ) : (
                        <ul>
                            {searchResult?.elements?.map((product: any) => (
                                <li>
                                    <div key={product.id} class="border-b p-2">
                                        <a
                                            href={
                                                getShopwareUrl(
                                                    ShopwareURL.SHOP_ROOT,
                                                ) +
                                                product.seoUrls[0].seoPathInfo
                                            }
                                            title={product.translated.name}
                                        >
                                            {product.translated.name}
                                        </a>
                                    </div>
                                </li>
                            ))}

                            {searchResult?.elements?.length > 0 && (
                                <li class="bg-gray-600 p-2  text-white">
                                    <>
                                        {searchResult?.total}{' '}
                                        {t('suggest_search_result_total')}
                                        <br />
                                        <a
                                            href={getShopwareUrl(
                                                ShopwareURL.SEARCH,
                                                { search: searchParam },
                                            )}
                                            class="text-white"
                                        >
                                            {t('suggest_serach_show_more')}
                                        </a>
                                    </>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
