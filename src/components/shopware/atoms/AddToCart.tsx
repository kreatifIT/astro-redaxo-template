import { useStore } from '@nanostores/preact';
import ProductSelectQuantity from './ProductSelectQuantity';
import {
    ShopwareApiInstanceStore,
    showOffcanvasStore,
} from '../utils/shopware-store';
import { addProductToCart } from '@shopware-pwa/shopware-6-client';
import useTranslations from '@helpers/translations/client';
import { getClangCodeFromCookie } from '../helpers/client';
import { toast } from 'react-toastify';

interface Props {
    product: any;
    showQuantity: boolean;
}

export default function AddToCart({ product, showQuantity }: Props) {
    const _showOffcanvasStore = useStore(showOffcanvasStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const addToCart = async (
        e: any,
        productId: string,
        minQuantity: number,
    ) => {
        e.preventDefault();
        let quantity = minQuantity;
        if (showQuantity) {
            const productAmount = document.querySelector(
                '[data-product-amount]',
            ) as HTMLFormElement;
            quantity = productAmount ? parseInt(productAmount?.value) : 1;
        }
        let response = await addProductToCart(
            productId as string,
            quantity as number,
            contextInstance as any,
        );

        if (response.errors.length === undefined) {
            toast.error(
                t(response.errors[Object.keys(response.errors)[0]].messageKey)
                    .replace(
                        '%name%',
                        response.errors[Object.keys(response.errors)[0]].name,
                    )
                    .replace(
                        '%amount%',
                        response.errors[Object.keys(response.errors)[0]]
                            .quantity,
                    ),
            );
        } else {
            toast.success(t('product_added_to_cart'));
        }
        showOffcanvasStore.set(!_showOffcanvasStore);
        return false;
    };

    return (
        <>
            <div class="mt-2 flex flex-row justify-between">
                {product.calculatedMaxPurchase > 0 && showQuantity && (
                    <>
                        <ProductSelectQuantity
                            minPurchase={product.minPurchase}
                            calculatedMaxPurchase={
                                product.calculatedMaxPurchase
                            }
                            purchaseSteps={product.purchaseSteps}
                        />
                    </>
                )}

                {product.calculatedMaxPurchase > 0 && (
                    <a
                        onClick={(e) =>
                            addToCart(e, product.id, product.minPurchase)
                        }
                        class="block w-1/2 cursor-pointer rounded bg-green-600 px-0.5 py-2 text-center text-white"
                    >
                        {t('add_to_cart')}
                    </a>
                )}
            </div>
        </>
    );
}
