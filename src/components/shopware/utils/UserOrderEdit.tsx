import { useEffect, useState } from 'preact/hooks';
import {
    formatPrice,
    getClangCodeFromCookie,
    getShopwareUrl,
} from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import {
    changeOrderPaymentMethod,
    getOrderDetails,
    handlePayment,
    setCurrentPaymentMethod,
} from '@shopware-pwa/shopware-6-client';
import type { ShopwareApiInstance } from '@shopware-pwa/shopware-6-client';
import UserPaymetns from './UserPayments';
import ShppingMethods from '../atoms/ShppingMethods';
import { changeDefaultPaymentMethod } from '@adapters/shopware';
import useTranslations from '@helpers/translations/client';

export default function UserOrderEdit() {
    const customer = useStore(customerStore);
    const contextInstance: any = useStore(ShopwareApiInstanceStore);

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order') ? urlParams.get('order')! : 0;
    const states = ['failed', 'reminded', 'unconfirmed', 'cancelled'];

    const [order, setOrder] = useState<any>([]);
    const [showPayment, setShowPayment] = useState(false);
    const [loadOrderData, setLoadOrderData] = useState(false);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    if (customer && contextInstance) {
        setLoadOrderData(true);
    }

    useEffect(() => {
        const loadOrder = async (
            orderId: string,
            contextInstance: ShopwareApiInstance,
        ) => {
            const _order = await getOrderDetails(
                orderId,
                {
                    associations: {
                        lineItems: {
                            associations: {
                                cover: {},
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
                        transactions: {
                            sort: [
                                {
                                    field: 'createdAt',
                                    order: 'desc',
                                },
                            ],
                            associations: {
                                paymentMethod: {},
                            },
                        },
                    },
                },
                contextInstance,
            );

            const orderState = _order.stateMachineState.technicalName;
            const orderPaymentState =
                _order.transactions[0].stateMachineState.technicalName;

            if (
                orderState != 'cancelled' &&
                states.includes(orderPaymentState)
            ) {
                const defaultPaymentMethodId =
                    _order.transactions[0].paymentMethod.id;
                const contextToken = contextInstance.config.contextToken;
                const swLangId = contextInstance.config.languageId;

                if (defaultPaymentMethodId) {
                    await setCurrentPaymentMethod(
                        defaultPaymentMethodId,
                        contextInstance as any,
                    );

                    await changeDefaultPaymentMethod(
                        defaultPaymentMethodId,
                        contextToken as string,
                        swLangId as string,
                    );

                    await changeOrderPaymentMethod(
                        _order.id,
                        defaultPaymentMethodId,
                        contextInstance as any,
                    );
                }
                // set PaymentMethod of Order

                setOrder(_order);
                setShowPayment(true);
            } else {
                setOrder(_order);
                setShowPayment(false);
            }
        };

        if (contextInstance && orderId && customer) {
            loadOrder(orderId, contextInstance);
        }
    }, [loadOrderData]);

    const payOrder = async () => {
        const base_url = window.location.origin;
        const finishUrl =
            base_url +
            getShopwareUrl(ShopwareURL.CHECKOUT_FINISHED, {
                orderId: orderId.toString(),
            });
        const errorUrl =
            base_url +
            getShopwareUrl(ShopwareURL.CHECKOUT_FINISHED, { error: true });

        const orderPayment = await handlePayment(
            {
                orderId: orderId.toString(),
                finishUrl: finishUrl,
                errorUrl: errorUrl,
            },
            contextInstance as any,
        );

        if (orderPayment.redirectUrl) {
            window.location.href = orderPayment.redirectUrl;
        } else {
            window.location.href = finishUrl;
        }
    };

    return (
        <>
            {showPayment ? (
                <>
                    <div class="mb-5 mt-5 ">
                        <h1>{t('complete_payment')}</h1>

                        <h2>{t('agb_headline')}</h2>
                        <p>{t('agb_already_accepted')}</p>
                    </div>
                    <div class="mb-5 mt-5 flex">
                        <div class="mb-2 mt-5 w-[50%] pr-10">
                            <h2 class="mb-5 border-b pb-2 font-bold">
                                {t('default_billing_address')}
                            </h2>
                            <div>
                                <p>
                                    {order?.billingAddress?.firstName + ' '}
                                    {order?.billingAddress?.lastName}
                                </p>
                                <p>{order?.billingAddress?.street}</p>
                                <p>
                                    {order?.billingAddress?.zipcode + ' '}
                                    {order?.billingAddress?.city}
                                </p>
                                <p>
                                    {
                                        order?.billingAddress?.country
                                            .translated.name
                                    }
                                </p>
                            </div>
                        </div>
                        <div class="mb-2 mt-5 w-[50%] pr-10">
                            <h2 class="mb-5 border-b pb-2 font-bold">
                                {t('default_shipping_address')}
                            </h2>
                            <div>
                                <p>
                                    {order?.deliveries?.[0]
                                        ?.shippingOrderAddress?.firstName + ' '}
                                    {
                                        order?.deliveries?.[0]
                                            ?.shippingOrderAddress?.lastName
                                    }
                                </p>
                                <p>
                                    {
                                        order?.deliveries?.[0]
                                            ?.shippingOrderAddress?.street
                                    }
                                </p>
                                <p>
                                    {order?.deliveries?.[0]
                                        ?.shippingOrderAddress?.zipcode + ' '}
                                    {
                                        order?.deliveries?.[0]
                                            ?.shippingOrderAddress?.city
                                    }
                                </p>
                                <p>
                                    {
                                        order?.deliveries?.[0]
                                            ?.shippingOrderAddress?.country
                                            .translated.name
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2 flex">
                        <div class="mb-2 mt-5 w-[50%] pr-10">
                            <UserPaymetns
                                orderId={orderId ? orderId : undefined}
                            />
                        </div>
                        <div class="mb-2 mt-5 w-[50%] pr-10">
                            <h2 class="mb-5 border-b pb-2 font-bold">
                                {t('delivery_methods')}
                            </h2>
                            {
                                order?.deliveries?.[0]?.shippingMethod
                                    ?.translated.name
                            }
                        </div>
                    </div>

                    <div class="line-items mb-10 mt-10">
                        <div class="flex-warp line-item-header flex border-b">
                            <div class=" w-2/5 flex-col">
                                <b>{t('product')}</b>
                            </div>
                            <div class=" w-1/5 flex-col text-center">
                                <b>{t('amount')}</b>
                            </div>
                            <div class=" w-1/5 flex-col text-center">
                                <b>{t('unit_price')}</b>
                            </div>
                            <div class=" w-1/5 flex-col text-right">
                                <b>{t('sum')}</b>
                            </div>
                        </div>

                        <div class="line-items-liste">
                            {order?.lineItems?.map((item: any) => (
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
                            <b>{t('summary')}</b>
                        </h2>
                        <table class="w-[100%]">
                            <tr>
                                <td>{t('subtotal')}:</td>
                                <td class="text-right">
                                    {formatPrice(order?.price?.rawTotal)}
                                </td>
                            </tr>
                            <tr>
                                <td>{t('shipping_costs')}:</td>
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
                                <td>{t('total')}:</td>
                                <td class="text-right">
                                    {formatPrice(order?.price?.totalPrice)}
                                </td>
                            </tr>
                            <tr>
                                <td>{t('total_netto')}:</td>
                                <td class="text-right">
                                    {formatPrice(order?.price?.netPrice)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {t('excl_vat').replace(
                                        '%tax%',
                                        order?.price?.calculatedTaxes[0]
                                            ?.taxRate,
                                    )}
                                </td>
                                <td class="text-right">
                                    {formatPrice(
                                        order?.price?.calculatedTaxes[0]?.tax,
                                    )}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="mb-20 ml-auto mt-20 w-[35%]">
                        <button
                            onClick={() => {
                                payOrder();
                            }}
                            class="mt-5 block w-full rounded border border-black bg-green-900 px-2 py-3 text-center text-white"
                        >
                            {t('pay_order')}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div class="mb-5 mt-5 text-center">
                        <p>
                            {t('error_order_complete')}
                            <br />
                            <a href={getShopwareUrl(ShopwareURL.USER_ORDER)}>
                                {t('error_order_complete_text')}
                            </a>
                        </p>
                    </div>
                </>
            )}
        </>
    );
}