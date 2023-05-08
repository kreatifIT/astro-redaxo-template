import { useStore } from '@nanostores/preact';
import ProductSelectQuantity from './ProductSelectQuantity';
import {
    ShopwareApiInstanceStore,
    showOffcanvasStore,
} from '../utils/shopware-store';
import { addProductToCart } from '@shopware-pwa/shopware-6-client';

interface Props {
    product: any;
    showQuantity: boolean;
}

export default function AddToCart({ product, showQuantity }: Props) {
    const _showOffcanvasStore = useStore(showOffcanvasStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);

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
                        class="block w-1/2 cursor-pointer rounded bg-green-600 py-2 px-0.5 text-center text-white"
                    >
                        In den Warenkorb
                    </a>
                )}
            </div>
        </>
    );
}
