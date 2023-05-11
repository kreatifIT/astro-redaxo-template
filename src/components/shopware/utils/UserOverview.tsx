import { useStore } from '@nanostores/preact';
import { customerStore } from './shopware-store';
import UserMenu from '../atoms/UserMenu';
import { getClangCodeFromCookie, getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import DefaultBillingAddress from '../atoms/DefaultBillingAddress';
import DefaultShippingAddress from '../atoms/DefaultShippingAddress';
import useTranslations from '@helpers/translations/client';

export default function UserOverview() {
    const customer: any = useStore(customerStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    return (
        <>
            <div class="row mb-5 mt-5">
                <div class="flex w-full flex-row flex-wrap">
                    <div class="w-[20%] pb-20">
                        <UserMenu />
                    </div>
                    <div class="w-[80%] pl-20">
                        <h1>{t('overview')}</h1>
                        <p>{t('overview_text')}</p>

                        {customer && (
                            <>
                                <div class="mt-10 flex w-full flex-row flex-wrap">
                                    <div class="w-[50%] pr-10">
                                        <h2 class="mb-5 border-b pb-2 font-bold">
                                            {t('personal_data')}
                                        </h2>
                                        <div class="">
                                            <p>
                                                {customer?.firstName}{' '}
                                                {customer.lastName}
                                            </p>
                                            <p>{customer.email}</p>

                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_PROFILE,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                {t('change_profile')}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="w-[50%] pl-10">
                                        <h2 class="mb-5 border-b pb-2 font-bold">
                                            {t('standard_payment_methods')}
                                        </h2>
                                        <p class="font-bold">
                                            {
                                                customer.defaultPaymentMethod
                                                    .translated.name
                                            }
                                        </p>
                                        <p>
                                            {
                                                customer.defaultPaymentMethod
                                                    .translated.description
                                            }
                                        </p>
                                        <a
                                            href={getShopwareUrl(
                                                ShopwareURL.USER_PAYMENTS,
                                            )}
                                            class="mt-2 inline-block border p-2"
                                        >
                                            {t('change_payment_method')}
                                        </a>
                                    </div>
                                </div>

                                <div class="mt-10 flex w-full flex-row flex-wrap">
                                    <div class="w-[50%] pr-10">
                                        <div class="">
                                            <DefaultBillingAddress
                                                closeOverlay={undefined}
                                            />
                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_ADDRESSES,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                {t('change_billing_address')}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="w-[50%] pl-10">
                                        <div>
                                            <DefaultShippingAddress
                                                closeOverlay={undefined}
                                            />
                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_ADDRESSES,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                {t('change_shipping_address')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
