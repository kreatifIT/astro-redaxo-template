import DefaultBillingAddress from '../atoms/DefaultBillingAddress';
import DefaultShippingAddress from '../atoms/DefaultShippingAddress';
import CustomerAddresses from '../atoms/CustomerAddresses';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function UserAddress() {
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');
    return (
        <>
            <div>
                <h2 class="mb-5 border-b pb-2 font-bold">{t('addresses')}</h2>
                <p>{t('addresses_change_o_modify')}</p>
            </div>
            <div class="mt-10 flex flex-row flex-wrap">
                <div class="w-[50%] pr-5">
                    <DefaultBillingAddress closeOverlay={undefined} />
                </div>
                <div class="w-[50%] pl-5">
                    <DefaultShippingAddress closeOverlay={undefined} />
                </div>
            </div>

            <div class="mt-10 flex flex-row flex-wrap">
                <a
                    href="/de/shop/account/address/create"
                    class="border px-5 py-3"
                >
                    {t('add_new_address')}
                </a>
            </div>

            <div class="mt-10 flex flex-row flex-wrap">
                <CustomerAddresses
                    showChangeBilling={true}
                    showChangeShipping={true}
                    showButtons={true}
                    setFunction={undefined}
                />
            </div>
        </>
    );
}
