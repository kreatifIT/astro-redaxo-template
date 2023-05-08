import { getShopwareUrl } from '@components/shopware/helpers/client';
import { useStore } from '@nanostores/preact';
import AddCoupon from '@components/shopware/atoms/AddCoupon';
import CheckoutSummary from '../atoms/CheckoutSummary';
import { cartStore, showOffcanvasStore } from './shopware-store';
import { ShopwareURL } from '../helpers/url';
import LineItemList from '../atoms/LineItemList';

export default function Cart() {
    const _showOffcanvasStore = useStore(showOffcanvasStore);
    const cart = useStore(cartStore);

    if (cart?.lineItems.length === 0) {
        return (
            <div class="row mb-14">
                <div class="flex">
                    <div class="w-[70%] pr-20">
                        <p>Warenkorb ist leer</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div class="row mb-14">
                    <div class="flex">
                        <div class="w-[70%] pr-20">
                            <div class="mb-5 flex">
                                <div class="w-5/12 px-5">Produkt</div>
                                <div class="w-2/12 px-5">Anzahl</div>
                                <div class="w-2/12 px-5">Stückpreis</div>
                                <div class="w-2/12 px-5">Total</div>
                                <div class="w-1/12 px-5"></div>
                            </div>
                            <LineItemList lineItems={cart?.lineItems} />
                        </div>

                        <div class="w-[30%]">
                            <AddCoupon />

                            <CheckoutSummary />

                            <a
                                href={getShopwareUrl(ShopwareURL.CHECKOUT)}
                                class="btn btn-primary mt-5 inline-block w-full w-full border border-primary bg-primary px-3 py-2 text-center text-white transition-all"
                            >
                                Weiter zu Kasse
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
