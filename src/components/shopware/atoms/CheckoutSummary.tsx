import { useStore } from '@nanostores/preact';
import { cartStore } from '../utils/shopware-store';
import { formatPrice } from '../helpers/client';

export default function CheckoutSummary() {
    const cart: any = useStore(cartStore);

    return (
        <>
            <p>Zusammenfassung</p>
            <table class="w-full">
                <tr>
                    <td>Zwischensumme:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.positionPrice)}
                    </td>
                </tr>
                <tr>
                    <td>Versandkosten:</td>
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
                    <td>Gesamtsumme:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.totalPrice)}
                    </td>
                </tr>
                <tr>
                    <td>Gesamtnettosumme:</td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.netPrice)}
                    </td>
                </tr>
                <tr>
                    <td>
                        zzgl. {cart?.price.calculatedTaxes[0]?.taxRate}% Mwst.
                    </td>
                    <td class={'text-right'}>
                        {formatPrice(cart?.price.calculatedTaxes[0]?.tax)}
                    </td>
                </tr>
            </table>
        </>
    );
}
