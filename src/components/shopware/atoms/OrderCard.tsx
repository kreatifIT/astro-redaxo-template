// TODO
// nicht bezahlte Bestellungen sollten neu bezahlt werden können (wenn der Kunde z.B. die Zahlung abgebrochen hat)
// eigene Seite erstellen oder kann die Bestelllung normal übernommen werden?

import { useState } from 'preact/hooks';
import {
    formatPrice,
    getClangCodeFromCookie,
    getShopwareUrl,
} from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import useTranslations from '@helpers/translations/client';

interface Props {
    order: any;
}

export default function OrderCard({ order }: Props) {
    const [showLineItems, setShowLineItems] = useState(false);
    const [isPaymentNeeded, setIsPaymentNeeded] = useState(false);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const states = ['failed', 'reminded', 'unconfirmed', 'cancelled'];
    const orderState = order.stateMachineState.technicalName;
    const orderPaymentState =
        order.transactions[0].stateMachineState.technicalName;

    setIsPaymentNeeded(false);
    if (orderState != 'cancelled' && states.includes(orderPaymentState)) {
        setIsPaymentNeeded(true);
    }

    const toggleLineItems = (e: any) => {
        e.preventDefault();
        setShowLineItems(!showLineItems);
        return false;
    };

    return (
        <>
            <div class="mb-10 w-full rounded-lg border bg-white px-8 py-4 shadow-lg">
                <div>
                    <h2>
                        {t('order')}:{' '}
                        {order.orderDate
                            .split('T')[0]
                            .split('-')
                            .reverse()
                            .join('.')}
                        {isPaymentNeeded ? (
                            <>
                                <a
                                    href={getShopwareUrl(
                                        ShopwareURL.USER_ORDER_EDIT,
                                        { order: order.id },
                                    )}
                                    class="ml-2 rounded-lg bg-red-500 px-2 py-1 text-white"
                                >
                                    {t('payment_aborted')}
                                </a>
                            </>
                        ) : (
                            <span class="ml-2 rounded-full border px-5 py-1">
                                {order.stateMachineState.translated.name}
                            </span>
                        )}
                    </h2>
                    <p>
                        <span class="font-bold">{t('order_number')}:</span>
                        {' ' + order.orderNumber}
                    </p>

                    <div class="flex-column mt-5 flex flex-wrap">
                        <div class="flex-auto">
                            <div class="border-b">
                                <p class="font-bold">{t('shipping_state')}</p>
                            </div>
                            <div class="py-2">
                                {
                                    order.deliveries[0].stateMachineState
                                        .translated.name
                                }
                            </div>
                        </div>
                        <div class="flex-auto ">
                            <div class="border-b">
                                <p class="font-bold">{t('payment_state')}</p>
                            </div>
                            <div class="py-2">
                                {
                                    order.transactions[0].stateMachineState
                                        .translated.name
                                }
                            </div>
                        </div>
                        <div class="flex-auto ">
                            <div class="border-b">
                                <p class="font-bold">{t('payment_method')}</p>
                            </div>
                            <div class="py-2">
                                {
                                    order.transactions[0].paymentMethod
                                        .translated.name
                                }
                            </div>
                        </div>
                        <div class="flex-auto">
                            <div class="border-b">
                                <p class="font-bold">{t('delivery_method')}</p>
                            </div>
                            <div class="py-2">
                                {
                                    order.deliveries[0].shippingMethod
                                        .translated.name
                                }
                            </div>
                        </div>
                        <div class="flex-auto">
                            <div class="border-b">
                                <p>&nbsp;</p>
                            </div>
                            <div class="py-2">
                                <button
                                    class="float-right rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                    onClick={(e) => toggleLineItems(e)}
                                >
                                    {showLineItems ? t('hide') : t('show')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {showLineItems && (
                        <div class="mt-5 p-2">
                            <div class="flex flex-wrap border-b">
                                <div class="w-full p-2 md:w-1/2 xl:w-2/5">
                                    <b>{t('product')}</b>
                                </div>
                                <div class="w-full p-2 text-center md:w-1/2 xl:w-1/5">
                                    <b>{t('amount')}</b>
                                </div>
                                <div class="w-full p-2 text-center md:w-1/2 xl:w-1/5">
                                    <b>{t('unit_price')}</b>
                                </div>
                                <div class="w-full p-2 text-right md:w-1/2 xl:w-1/5">
                                    <b>{t('total_price')}</b>
                                </div>
                            </div>
                            {order.lineItems.map((lineItem: any) => (
                                <>
                                    <div class="flex flex-wrap border-b py-5">
                                        <div class="w-full p-2 md:w-1/2 xl:w-2/5">
                                            <div class="flex flex-wrap">
                                                <div class="w-full md:w-1/3">
                                                    <img
                                                        src={
                                                            lineItem?.cover?.url
                                                        }
                                                        alt={
                                                            lineItem?.cover?.alt
                                                        }
                                                        class="w-full"
                                                    />
                                                </div>
                                                <div class="w-full md:w-2/3">
                                                    <b>{lineItem.label}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full p-2 text-center md:w-1/2 xl:w-1/5">
                                            {lineItem.quantity}
                                        </div>
                                        <div class="w-full p-2 text-center md:w-1/2 xl:w-1/5">
                                            {formatPrice(lineItem.unitPrice)}
                                        </div>
                                        <div class="w-full p-2 text-right md:w-1/2 xl:w-1/5">
                                            {formatPrice(lineItem.totalPrice)}
                                        </div>
                                    </div>
                                </>
                            ))}

                            <div class="flex flex-wrap border-b py-5">
                                <div class="w-full p-2 md:w-1/2">
                                    <table class="w-full">
                                        <tr>
                                            <th class="text-left">
                                                {t('order_date')}:
                                            </th>
                                            <td>
                                                {order.orderDate
                                                    .split('T')[0]
                                                    .split('-')
                                                    .reverse()
                                                    .join('.')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="text-left">
                                                {t('order_number')}:
                                            </th>
                                            <td>{order.orderNumber}</td>
                                        </tr>
                                        <tr>
                                            <th class="text-left">
                                                {t('payment_method')}:
                                            </th>
                                            <td>
                                                {
                                                    order.transactions[
                                                        order.transactions
                                                            .length - 1
                                                    ].paymentMethod.translated
                                                        .name
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="text-left">
                                                {t('shipping_method')}:
                                            </th>
                                            <td>
                                                {
                                                    order.deliveries[0]
                                                        .shippingMethod
                                                        .translated.name
                                                }
                                            </td>
                                        </tr>
                                        {order.deliveries[0].trackingCodes
                                            ?.lenght > 0 && (
                                            <>
                                                <tr>
                                                    <th class="text-left">
                                                        {t('parcel_tracking')}:
                                                    </th>
                                                    <td>
                                                        {order.deliveries[0].trackingCodes?.map(
                                                            (tracking: any) => (
                                                                <>
                                                                    <p>
                                                                        {
                                                                            tracking
                                                                        }
                                                                    </p>
                                                                </>
                                                            ),
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </table>
                                </div>
                                <div class="w-full p-2 md:w-1/2">
                                    <table class="w-full">
                                        <tr>
                                            <th class="text-left">
                                                {t('shipping_costs')}:
                                            </th>
                                            <td>
                                                {formatPrice(
                                                    order?.shippingTotal,
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="text-left">
                                                {t('total')}:
                                            </th>
                                            <td>
                                                {formatPrice(
                                                    order?.price?.totalPrice,
                                                )}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
