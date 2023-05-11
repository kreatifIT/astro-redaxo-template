import { useStore } from '@nanostores/preact';
import { cartStore, customerStore } from '../utils/shopware-store';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

interface Props {
    closeOverlay: any | undefined;
}

export default function DefaultBillingAddress({ closeOverlay }: Props) {
    const customer: any = useStore(customerStore);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                {t('default_billing_address')}
                {closeOverlay && (
                    <button
                        class="float-right"
                        onClick={(e) => closeOverlay(e)}
                    >
                        X
                    </button>
                )}
            </h2>
            {customer && (
                <div>
                    <p>
                        {customer?.defaultBillingAddress?.firstName + ' '}
                        {customer?.defaultBillingAddress?.lastName}
                    </p>
                    <p>{customer?.defaultBillingAddress?.street}</p>
                    <p>
                        {customer?.defaultBillingAddress.zipcode + ' '}
                        {customer?.defaultBillingAddress.city}
                    </p>
                    <p>
                        {
                            customer?.defaultBillingAddress.country.translated
                                .name
                        }
                    </p>
                </div>
            )}
        </>
    );
}
