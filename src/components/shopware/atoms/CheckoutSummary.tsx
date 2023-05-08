import { useStore } from '@nanostores/preact';
import { cartStore } from '../utils/shopware-store';

export default function CheckoutSummary() {
    const cart = useStore(cartStore);

    return (
        <>
            <p>Zusammenfassung</p>
            <table class="w-full">
                <tr>
                    <td>Zwischensumme:</td>
                    <td class={'text-right'}>
                        {cart?.price.positionPrice.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </td>
                </tr>
                <tr>
                    <td>Versandkosten:</td>
                    <td class={'text-right'}>
                        {cart?.deliveries[0]?.shippingCosts.totalPrice.toLocaleString(
                            'de-DE',
                            {
                                style: 'currency',
                                currency: 'EUR',
                            },
                        )}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td>Gesamtsumme:</td>
                    <td class={'text-right'}>
                        {cart?.price.totalPrice.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </td>
                </tr>
                <tr>
                    <td>Gesamtnettosumme:</td>
                    <td class={'text-right'}>
                        {cart?.price.netPrice.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </td>
                </tr>
                <tr>
                    <td>
                        zzgl. {cart?.price.calculatedTaxes[0]?.taxRate}% Mwst.
                    </td>
                    <td class={'text-right'}>
                        {cart?.price.calculatedTaxes[0]?.tax.toLocaleString(
                            'de-DE',
                            {
                                style: 'currency',
                                currency: 'EUR',
                            },
                        )}
                    </td>
                </tr>
            </table>
        </>
    );
}
