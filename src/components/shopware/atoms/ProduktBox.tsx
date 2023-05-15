import { useStore } from '@nanostores/preact';
import {
    formatPrice,
    getClangCodeFromCookie,
    getShopwareUrl,
    getThumbnail,
} from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import { customerStore } from '../utils/shopware-store';
import AddToCart from './AddToCart';
import ProductWhistlist from './ProductWhistlist';
import useTranslations from '@helpers/translations/client';

interface Props {
    product: any;
}

export default function ProductBox({ product }: Props) {
    const customer = useStore(customerStore);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    return (
        <div key={product.id} class=" w-1/3  p-3">
            <div class="relative border p-2">
                <a
                    href={
                        getShopwareUrl(ShopwareURL.SHOP_ROOT) +
                        product.seoUrls[0].seoPathInfo
                    }
                    title={product.translated.name}
                >
                    <img
                        src={getThumbnail(product.cover.media, 400, 400)}
                        alt={
                            product.cover.media.alt
                                ? product.cover.media.alt
                                : product.cover.media.fileName
                        }
                        class="mx-auto max-h-36"
                    />

                    <p class="font-bold">{product.translated.name}</p>

                    {product.calculatedCheapestPrice.hasRange ? (
                        <>
                            <p class="text-right">
                                {t('label_from')}{' '}
                                {formatPrice(
                                    product.calculatedCheapestPrice.unitPrice,
                                )}
                            </p>
                        </>
                    ) : (
                        <>
                            <p class="text-right">
                                {formatPrice(product.calculatedPrice.unitPrice)}
                            </p>
                        </>
                    )}
                </a>
                {customer ? (
                    <>
                        <AddToCart product={product} showQuantity={false} />
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
    );
}
