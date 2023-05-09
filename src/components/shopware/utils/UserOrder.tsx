import { useEffect, useState } from 'preact/hooks';
import OrderCard from '../atoms/OrderCard';
import { ShopwareApiInstanceStore } from './shopware-store';
import { useStore } from '@nanostores/preact';
import { getCustomerOrders } from '@shopware-pwa/shopware-6-client';

export default function UserOrder() {
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

    if (contextInstance) {
        setLoadOrder(true);
    }

    useEffect(() => {
        const _getCustomerOrders = async (
            contextInstance: any,
            setCustomerOrders: any,
        ) => {
            const _response = await getCustomerOrders(
                {
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
                },
                contextInstance,
            );

            setTotal(_response.total);
            setCustomerOrders(_response);
            window.scrollTo(0, 0);
        };

        if (contextInstance) {
            _getCustomerOrders(contextInstance, setCustomerOrders);

            if (initialPage === false) {
                history.pushState(null, '', `?page=${page}`);
            } else {
                setInitialPage(false);
            }
        }
    }, [loadOrder, page]);

    return (
        <div>
            <h2 class="mb-5 border-b pb-2 font-bold">Bestellungen</h2>
            {customerOrders && (
                <>
                    <div class="mt-5">
                        {customerOrders.total > 0 ? (
                            <>
                                <p>Ihre letzten Bestellungen:</p>
                                {customerOrders.elements.map((order: any) => (
                                    <>
                                        <OrderCard order={order} />
                                    </>
                                ))}
                            </>
                        ) : (
                            <p>Sie haben noch keine Bestellungen.</p>
                        )}
                    </div>

                    <div class="text-center">
                        {page > 1 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                class="mr-2"
                            >
                                Prev
                            </button>
                        )}
                        {page < total / step && (
                            <button
                                onClick={() => setPage(page + 1)}
                                class="ml-2"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
