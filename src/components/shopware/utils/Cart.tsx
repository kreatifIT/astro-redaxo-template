import {
    getClangCodeFromCookie,
    getShopwareUrl,
} from '@components/shopware/helpers/client';
import { useStore } from '@nanostores/preact';
import AddCoupon from '@components/shopware/atoms/AddCoupon';
import CheckoutSummary from '../atoms/CheckoutSummary';
import { cartStore } from './shopware-store';
import { ShopwareURL } from '../helpers/url';
import LineItemList from '../atoms/LineItemList';
import useTranslations from '@helpers/translations/client';

export default function Cart() {
    const cart: any = useStore(cartStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    if (cart?.lineItems.length === 0) {
        return (
            <div class="row mb-14">
                <div class="flex">
                    <div class="w-[70%] pr-20">
                        <p>{t('cart_empty')}</p>
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
                                <div class="w-5/12 px-5">{t('product')}</div>
                                <div class="w-2/12 px-5">{t('amount')}</div>
                                <div class="w-2/12 px-5">{t('unit_price')}</div>
                                <div class="w-2/12 px-5">
                                    {t('total_price')}
                                </div>
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
                                {t('action_to_checkout')}
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
