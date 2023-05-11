import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore, cartStore } from '../utils/shopware-store';
import { addPromotionCode } from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function AddCoupon() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [couponCodeSucces, setCouponCodeSucces] = useState('');
    const [couponCodeError, setCouponCodeError] = useState('');
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const addCoupon = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const couponCode = formData.get('couponCode');

        const _response = await addPromotionCode(
            formData.get('couponCode') as string,
            contextInstance as any,
        ).then((response) => {
            if (
                response.errors &&
                response.errors['promotion-not-found']?.key ===
                    'promotion-not-found'
            ) {
                setCouponCodeError(
                    'Der Gutschein-Code "' + couponCode + '" existiert nicht.',
                );
                setTimeout(() => {
                    setCouponCodeError('');
                }, 5000);
            } else {
                setCouponCodeSucces('Coupon wurde hinzugefügt');
                setTimeout(() => {
                    setCouponCodeSucces('');
                }, 5000);
            }
            cartStore.set(response);
        });
        return false;
    };

    return (
        <>
            <form
                method="post"
                class="mb-10 mt-10"
                onSubmit={(e) => addCoupon(e)}
            >
                {couponCodeSucces && (
                    <div class="relative mb-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                        <span class="block sm:inline">{couponCodeSucces}</span>
                    </div>
                )}

                {couponCodeError && (
                    <div class="relative mb-5 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                        <span class="block sm:inline">{couponCodeError}</span>
                    </div>
                )}

                <div class="mb-4 flex items-center">
                    <input
                        type="text"
                        class="w-full rounded-lg border border-gray-400 p-2"
                        placeholder={t('coupon_code')}
                        name="couponCode"
                    />
                    <button
                        type="submit"
                        class="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                        {t('add_coupon')}
                    </button>
                </div>
            </form>
        </>
    );
}
