import { useEffect, useState } from 'preact/hooks';
import OrderCard from '../atoms/OrderCard';
import { ShopwareApiInstanceStore } from './shopware-store';
import { useStore } from '@nanostores/preact';
import { getCustomerOrders } from '@shopware-pwa/shopware-6-client';

export default function UserOrder() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [customerOrders, setCustomerOrders] = useState<any>([]);

    useEffect(() => {
        if (contextInstance) {
            const _getCustomerOrders = async (
                contextInstance: any,
                setCustomerOrders: any,
            ) => {
                const _response = await getCustomerOrders(
                    {
                        associations: {
                            transactions: {
                                associations: {
                                    paymentMethod: {},
                                },
                            },
                            lineItems: {
                                associations: {
                                    cover: {},
                                },
                            },
                            addresses: {},
                            deliveries: {
                                associations: {
                                    shippingMethod: {},
                                },
                            },
                        },
                    },
                    contextInstance,
                );
                setCustomerOrders(_response);
            };
            _getCustomerOrders(contextInstance, setCustomerOrders);
        }
    }, [contextInstance]);

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
                </>
            )}
        </div>
    );
}
