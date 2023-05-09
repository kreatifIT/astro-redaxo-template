import { useEffect, useState } from 'preact/hooks';
import {
    formatPrice,
    getShopwareUrl,
} from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import { getCustomerOrders } from '@shopware-pwa/shopware-6-client';

interface Props {
    orderId: string;
}

export default function CheckoutFinished({ orderId }: Props) {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [order, setOrder] = useState<any>(null);
    const [loadOrder, setLoadOrder] = useState(false);

    if (contextInstance) {
        setLoadOrder(true);
    }

    useEffect(() => {
        const getOrder = async () => {
            const _response = await getCustomerOrders(
                {
                    filter: [
                        {
                            type: 'equals',
                            field: 'id',
                            value: orderId,
                        },
                    ],
                    associations: {
                        transactions: {
                            associations: {
                                paymentMethod: {},
                            },
                        },
                        deliveries: {
                            associations: {
                                shippingMethod: {},
                                shippingOrderAddress: {
                                    associations: {
                                        country: {},
                                    },
                                },
                            },
                        },
                        billingAddress: {
                            associations: {
                                country: {},
                            },
                        },
                        lineItems: {
                            associations: {
                                cover: {},
                            },
                        },
                    },
                },
                contextInstance as any,
            );
            setOrder(_response?.elements[0]);
        };
        if (contextInstance) {
            getOrder();
        }
    }, [loadOrder]);

    return (
        <>
            {order ? (
                <div className="container ml-auto mr-auto">
                    <div className="row">
                        <div className="col-12 mb-20 mt-5">
                            <h1 class={'text-center'}>
                                Vielen Dank für Ihre Bestellung!
                            </h1>
                            <p class={'text-center'}>
                                Ihre Bestellnummer:{' '}
                                <strong>{order?.orderNumber}</strong>
                            </p>
                            <p class={'text-center'}>
                                Bestellbestätigungs-E-Mail wurde verschickt.
                            </p>
                        </div>
                    </div>

                    <div class="flex-warp flex flex-row justify-center">
                        <div class="flex w-full flex-col pr-10 md:w-1/2 lg:w-1/3">
                            <div class="mb-4 flex flex-col rounded-lg">
                                <div class="mb-2 flex flex-row justify-between border-b">
                                    <div class=" text-sm font-semibold text-gray-600">
                                        Rechnungsadresse
                                    </div>
                                </div>
                                <div class="">
                                    <p>
                                        {order?.billingAddress.firstName}{' '}
                                        {order?.billingAddress.lastName}
                                    </p>
                                    <p>{order?.billingAddress.street}</p>
                                    <p>
                                        {order?.billingAddress.zipcode}{' '}
                                        {order?.billingAddress.city}
                                    </p>
                                    <p>
                                        {
                                            order?.billingAddress.country
                                                .translated.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full flex-col pr-10 md:w-1/2 lg:w-1/3">
                            <div class="mb-4 flex flex-col rounded-lg">
                                <div class="mb-2 flex flex-row justify-between border-b">
                                    <div class="text-sm font-semibold text-gray-600">
                                        Lieferadresse
                                    </div>
                                </div>
                                <div class="">
                                    <p>
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.firstName
                                        }{' '}
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.lastName
                                        }
                                    </p>
                                    <p>
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.street
                                        }
                                    </p>
                                    <p>
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.zipcode
                                        }{' '}
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.city
                                        }
                                    </p>
                                    <p>
                                        {
                                            order?.deliveries[0]
                                                .shippingOrderAddress.country
                                                .translated.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full flex-col md:w-1/2 lg:w-1/3">
                            <div class="mb-4 flex flex-col rounded-lg">
                                <div class="mb-2 flex flex-row justify-between border-b">
                                    <div class="text-sm font-semibold text-gray-600">
                                        Informationen
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        <b>Zahlungsart</b>:{' '}
                                        {
                                            order?.transactions[0].paymentMethod
                                                .translated.name
                                        }
                                    </p>
                                    <p>
                                        <b>Versand</b>:{' '}
                                        {
                                            order.deliveries[0].shippingMethod
                                                .translated.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="line-items mb-10 mt-10">
                        <div class="flex-warp line-item-header flex border-b">
                            <div class=" w-2/5 flex-col">
                                <b>Produkt</b>
                            </div>
                            <div class=" w-1/5 flex-col text-center">
                                <b>Anzahl</b>
                            </div>
                            <div class=" w-1/5 flex-col text-center">
                                <b>Einzelpreis</b>
                            </div>
                            <div class=" w-1/5 flex-col text-right">
                                <b>Summe</b>
                            </div>
                        </div>
                        <div class="line-items-liste">
                            {order?.lineItems.map((item: any) => (
                                <>
                                    <div class="flex-warp line-item flex border-b py-5">
                                        <div class=" w-2/5 flex-col">
                                            <div class={'flex flex-row'}>
                                                <div class={'w-1/3'}>
                                                    <img
                                                        src={
                                                            item.cover?.url ||
                                                            ''
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div class={'w-2/3'}>
                                                    <p>
                                                        <b>{item.label}</b>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" w-1/5 flex-col text-center">
                                            <b>{item.quantity}</b>
                                        </div>
                                        <div class=" w-1/5 flex-col text-center">
                                            <b>{formatPrice(item.unitPrice)}</b>
                                        </div>
                                        <div class=" w-1/5 flex-col text-right">
                                            <b>
                                                {formatPrice(item.totalPrice)}
                                            </b>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    <div class="mb-20 ml-auto mt-20 w-[35%]">
                        <h2>
                            <b>Zusammenfassung</b>
                        </h2>
                        <table class="w-[100%]">
                            <tr>
                                <td>Zwischensumem:</td>
                                <td class="text-right">
                                    {formatPrice(order?.price?.rawTotal)}
                                </td>
                            </tr>
                            <tr>
                                <td>Versandkosten:</td>
                                <td class="text-right">
                                    {formatPrice(
                                        order?.deliveries &&
                                            order?.deliveries[0]?.shippingCosts
                                                .totalPrice,
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
                                <td class="text-right">
                                    {formatPrice(order?.price?.totalPrice)}
                                </td>
                            </tr>
                            <tr>
                                <td>Gesamtnettosumme:</td>
                                <td class="text-right">
                                    {formatPrice(order?.price?.totalPrice)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    zzgl.{' '}
                                    {order?.price?.calculatedTaxes[0]?.taxRate}%
                                    Mwst.
                                </td>
                                <td class="text-right">
                                    {formatPrice(
                                        order?.price?.calculatedTaxes[0]?.tax,
                                    )}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 class="text-center">
                                Bestellung nicht gefunden
                            </h1>
                            <p class="text-center">
                                Sehen Sie ihre Bestellungen unter "
                                <a
                                    href={getShopwareUrl(
                                        ShopwareURL.USER_ORDER,
                                    )}
                                >
                                    Meine Bestellungen
                                </a>
                                " ein.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
