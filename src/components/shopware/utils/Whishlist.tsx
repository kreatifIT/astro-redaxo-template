import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    customerStore,
    customerWhistListStore,
} from './shopware-store';
import { useEffect, useState } from 'preact/hooks';
import ProductWhistlist from '../atoms/ProductWhistlist';
import { getWishlistProducts } from '@shopware-pwa/shopware-6-client';

interface Props {
    contextToken: string | undefined;
    swLangId: string | undefined;
    whishlist: any;
}

export default function Whistlist({
    contextToken,
    swLangId,
    whishlist,
}: Props) {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [_whishlist, setWhishlist] = useState(whishlist);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            // hier müssen wir ein timeout einbauen, da sonst die wishlist nicht richtig geladen wird
            const fetchData = async (setWhishlist: (arg0: any) => void) => {
                let _respons = await getWishlistProducts(
                    {},
                    contextInstance as any,
                );
                setWhishlist(_respons);
                setLoading(false);
                location.reload();
            };
            fetchData(setWhishlist);
        }
    }, [loading]);

    return (
        <>
            {customer ? (
                <>
                    <h1 class="mt-5 mb-5 text-center">Ihre Merkliste</h1>

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
                                            {product.calculatedPrice.unitPrice.toLocaleString(
                                                'de-DE',
                                                {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                },
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
                <h1 class="mt-5 mb-5 text-center">
                    Bitte loggen Sie sich ein um Ihre Merkliste zu sehen.
                </h1>
            )}
        </>
    );
}
