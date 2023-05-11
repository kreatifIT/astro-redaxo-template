import { useEffect, useState } from 'preact/hooks';
import OrderCard from '../atoms/OrderCard';
import { ShopwareApiInstanceStore } from './shopware-store';
import { useStore } from '@nanostores/preact';
import { getCustomerOrders } from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

interface Props {
    itemId: string | undefined;
}

export default function UserOrder({ itemId }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [customerOrders, setCustomerOrders] = useState<any>([]);
    const [loadOrder, setLoadOrder] = useState(false);
    // page aus get parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const _page = urlParams.get('page') ? parseInt(urlParams.get('page')!) : 1;
    const [page, setPage] = useState(_page);
    const [total, setTotal] = useState(0);
    const step = 10;
    const [initialPage, setInitialPage] = useState(true);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    if (contextInstance) {
        setLoadOrder(true);
    }

    useEffect(() => {
        const _getCustomerOrders = async (
            itemId: string | undefined,
            contextInstance: any,
            setCustomerOrders: any,
        ) => {
            let bodyParams: any = {};
            if (itemId) {
                bodyParams = {
                    page: page,
                    limit: step,
                    filter: [
                        {
                            type: 'equals',
                            field: 'deepLinkCode',
                            value: itemId,
                        },
                    ],
                    sort: [
                        {
                            field: 'orderDateTime',
                            order: 'desc',
                        },
                    ],
                    associations: {
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
                        lineItems: {
                            associations: {
                                cover: {},
                            },
                        },
                        deliveries: {
                            associations: {
                                shippingMethod: {},
                            },
                        },
                    },
                    'total-count-mode': 1,
                };
            } else {
                bodyParams = {
                    page: page,
                    limit: step,
                    sort: [
                        {
                            field: 'orderDateTime',
                            order: 'desc',
                        },
                    ],
                    associations: {
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
                        lineItems: {
                            associations: {
                                cover: {},
                            },
                        },
                        deliveries: {
                            associations: {
                                shippingMethod: {},
                            },
                        },
                    },
                    'total-count-mode': 1,
                };
            }

            const _response = await getCustomerOrders(
                bodyParams,
                contextInstance,
            );

            setTotal(_response.total);
            setCustomerOrders(_response);
            window.scrollTo(0, 0);
        };

        if (contextInstance) {
            _getCustomerOrders(itemId, contextInstance, setCustomerOrders);

            if (initialPage === false) {
                history.pushState(null, '', `?page=${page}`);
            } else {
                setInitialPage(false);
            }
        }
    }, [loadOrder, page]);

    return (
        <div>
            <h2 class="mb-5 border-b pb-2 font-bold">{t('orders')}</h2>
            {customerOrders && (
                <>
                    <div class="mt-5">
                        {customerOrders.total > 0 ? (
                            <>
                                <p>{t('last_orders')}:</p>
                                {customerOrders.elements.map((order: any) => (
                                    <>
                                        <OrderCard order={order} />
                                    </>
                                ))}
                            </>
                        ) : (
                            <p>{t('no_orders')}</p>
                        )}
                    </div>

                    <div class="text-center">
                        {page > 1 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                class="mr-2"
                            >
                                {t('pagination_prev')}
                            </button>
                        )}
                        {page < total / step && (
                            <button
                                onClick={() => setPage(page + 1)}
                                class="ml-2"
                            >
                                {t('pagination_next')}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
