import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore, cartStore } from '../utils/shopware-store';
import { addPromotionCode } from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';
import { toast } from 'react-toastify';

export default function AddCoupon() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const addCoupon = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const couponCode = formData.get('couponCode')
            ? formData.get('couponCode')
            : ' ';

        if (couponCode && couponCode?.length >= 2) {
            const _response = await addPromotionCode(
                formData.get('couponCode') as string,
                contextInstance as any,
            ).then((response) => {
                if (
                    response.errors &&
                    response.errors['promotion-not-found']?.key ===
                        'promotion-not-found'
                ) {
                    toast.error(
                        t('coupon_code_does_not_exist').replace(
                            '%couponCode%',
                            couponCode as string,
                        ),
                    );
                } else {
                    toast.success(t('coupon_added'));
                }
                cartStore.set(response);
            });
        }
        return false;
    };

    return (
        <>
            <form
                method="post"
                class="mb-10 mt-10"
                onSubmit={(e) => addCoupon(e)}
            >
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
