import { useStore } from '@nanostores/preact';
import { cartStore } from '../utils/shopware-store';
import { formatPrice, getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function CheckoutSummary() {
    const cart: any = useStore(cartStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    return (
        <>
            <p>{t('summary')}</p>
            <table class="w-full">
                <tr>
                    <td>{t('subtotal')}:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.positionPrice)}
                    </td>
                </tr>
                <tr>
                    <td>{t('shipping_costs')}:</td>
                    <td class={'text-right'}>
                        {formatPrice(
                            cart?.deliveries?.[0]?.shippingCosts.totalPrice,
                        )}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td>{t('total')}:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.totalPrice)}
                    </td>
                </tr>
                <tr>
                    <td>{t('total_netto')}:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.netPrice)}
                    </td>
                </tr>
                <tr>
                    <td>
                        {t('incl_vat').replace(
                            '%tax%',
                            cart?.price.calculatedTaxes[0]?.taxRate,
                        )}
                    </td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.calculatedTaxes[0]?.tax)}
                    </td>
                </tr>
            </table>
        </>
    );
}
