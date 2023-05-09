import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    customerStore,
    customerWhistListStore,
} from './shopware-store';
import { useEffect, useState } from 'preact/hooks';
import ProductWhistlist from '../atoms/ProductWhistlist';
import { getWishlistProducts } from '@shopware-pwa/shopware-6-client';
import { formatPrice } from '../helpers/client';

export default function Whistlist() {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [_whishlist, setWhishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);

    if (contextInstance && customer) {
        setInitialLoading(true);
    }

    useEffect(() => {
        // hier müssen wir ein timeout einbauen, da sonst die wishlist nicht richtig geladen wird
        const fetchData = async (setWhishlist: (arg0: any) => void) => {
            let _respons = await getWishlistProducts(
                {},
                contextInstance as any,
            );
            setWhishlist(_respons);
            setLoading(false);
            if (loading) {
                location.reload();
            }
        };
        fetchData(setWhishlist);
    }, [initialLoading]);

    useEffect(() => {
        if (loading) {
            location.reload();
        }
    }, [loading]);

    return (
        <>
            {customer ? (
                <>
                    <h1 class="mb-5 mt-5 text-center">Ihre Merkliste</h1>

                    <div class="flex w-full flex-row flex-wrap">
                        {_whishlist?.products?.elements?.map((product: any) => (
                            <div key={product.id} class=" w-1/3  p-3">
                                <div class="relative border p-2">
                                    <a href="" title={product.translated.name}>
                                        <img
                                            src={product.cover.media.url}
                                            alt={product.cover.media.alt}
                                        />
                                        <p class="font-bold">
                                            {product.translated.name}
                                        </p>
                                        <br />
                                        <p class="text-right">
                                            {formatPrice(
                                                product.calculatedPrice
                                                    .unitPrice,
                                            )}
                                        </p>
                                    </a>

                                    <ProductWhistlist
                                        productId={product.id}
                                        setLoading={setLoading}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h1 class="mb-5 mt-5 text-center">
                    Bitte loggen Sie sich ein um Ihre Merkliste zu sehen.
                </h1>
            )}
        </>
    );
}
