import { searchSuggestedProducts } from '@shopware-pwa/shopware-6-client';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from '../utils/shopware-store';
import { useStore } from '@nanostores/preact';
import { getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';

export default function SearchWidget() {
    let [searchResult, setSearchResult] = useState<string[]>([]);
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const handleChange = async (event: any) => {
        const search = event.target.value;
        // mindestens 3 zeichen
        if (search && search.length >= 3) {
            const searchResponse = await searchSuggestedProducts(
                'abc',
                contextInstance as any,
            );
        }
    };

    return (
        <div class="search relative">
            <input
                type="text"
                class="search__input border-2 border-black"
                placeholder="Suche"
                onInput={handleChange}
            />
            <div className="search_result absolute border-black bg-white">
                <ul>
                    {searchResult?.map((product: any) => (
                        <li class="mb-2">
                            <div key={product.id}>
                                <a
                                    href={
                                        getShopwareUrl(ShopwareURL.SHOP_ROOT) +
                                        product.seoUrls[0].seoPathInfo
                                    }
                                    title={product.translated.name}
                                >
                                    {product.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
