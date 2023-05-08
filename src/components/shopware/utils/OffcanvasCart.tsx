import { getShopwareUrl } from '@components/shopware/helpers/client';
import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    cartStore,
    customerStore,
    showOffcanvasStore,
} from './shopware-store';
import RemoveLineItem from '../atoms/RemoveLineItem';
import { ShopwareURL } from '../helpers/url';
import AddCoupon from '../atoms/AddCoupon';
import { getCart } from '@shopware-pwa/shopware-6-client';

export default function OffcanvasCart() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const customer = useStore(customerStore);
    const _showOffcanvasStore = useStore(showOffcanvasStore);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const cart = useStore(cartStore);

    useEffect(() => {
        const fetchData = async (contextInstance: any) => {
            const _response = await getCart(contextInstance as any);
            cartStore.set(_response);
        };

        if (_showOffcanvasStore && contextInstance) {
            fetchData(contextInstance);
        }

        setShowOffcanvas(_showOffcanvasStore);
    }, [_showOffcanvasStore, contextInstance]);

    const closeOffcanvas = () => {
        showOffcanvasStore.set(false);
    };

    return (
        <>
            <div
                class={
                    showOffcanvas
                        ? 'fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-50'
                        : ''
                }
                onClick={(e) => closeOffcanvas()}
            ></div>
            <div
                class={
                    showOffcanvas
                        ? 'fixed right-0 top-0 bottom-0  z-50 w-[414px] overflow-y-scroll border-l bg-white transition-all duration-300'
                        : 'fixed top-0 bottom-0 -right-full z-50 w-[414px] border-l  bg-white transition-all duration-300'
                }
            >
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasCart"
                    aria-labelledby="offcanvasCartLabel"
                >
                    <div class="bg-gray-50">
                        <span
                            class="flex-column flex cursor-pointer flex-wrap px-2 py-3"
                            onClick={(e) => closeOffcanvas()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#000"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Weiter einkaufen
                        </span>
                    </div>

                    <div class="p-5">
                        <div className="offcanvas-header mb-5">
                            <div class="flex flex-wrap justify-between">
                                <h5
                                    className="offcanvas-title"
                                    id="offcanvasCartLabel"
                                >
                                    <b>Warenkorb</b>
                                </h5>
                                <span class="">
                                    {cart?.lineItems?.length} Produkte
                                </span>
                            </div>
                        </div>

                        {cart && cart?.lineItems?.length > 0 ? (
                            <div className="offcanvas-body">
                                <div className="row">
                                    <div className="col-12">
                                        {cart?.lineItems?.map((item: any) => (
                                            <>
                                                <div className="card  border-b pt-5 pb-5">
                                                    <div className="flex-column flex flex-wrap">
                                                        <div className="w-[25%]">
                                                            {item.type ===
                                                                'product' && (
                                                                <>
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .cover
                                                                                ?.url
                                                                        }
                                                                        className="img-fluid rounded-start"
                                                                        alt="..."
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="w-[70%] pl-5 pr-5">
                                                            <div className="card-body">
                                                                <h5 className="card-title">
                                                                    <b>
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                        x{' '}
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </b>
                                                                </h5>

                                                                <p className="card-text">
                                                                    {item.price.totalPrice.toLocaleString(
                                                                        'de-DE',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'EUR',
                                                                        },
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="w-[5%]">
                                                            <RemoveLineItem
                                                                lineItem={item}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <AddCoupon cart={cart} />
                                                <table class="my-5 w-full">
                                                    <tr>
                                                        <th class="text-left">
                                                            Zwischensumme
                                                        </th>
                                                        <td class="text-right">
                                                            {cart.price.totalPrice.toLocaleString(
                                                                'de-DE',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'EUR',
                                                                },
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-left">
                                                            Versandkosten
                                                        </th>
                                                        <td class="text-right">
                                                            {cart?.deliveries[0].shippingCosts.totalPrice.toLocaleString(
                                                                'de-DE',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'EUR',
                                                                },
                                                            )}
                                                        </td>
                                                    </tr>
                                                </table>
                                                <p class="mt-5 text-xs">
                                                    * Preise inkl. MwSt. zzgl.
                                                    Versandkosten
                                                </p>
                                                <a
                                                    href={getShopwareUrl(
                                                        ShopwareURL.CHECKOUT,
                                                    )}
                                                    class="btn btn-primary mt-5 inline-block w-full w-full border border-primary bg-primary px-3 py-2 text-center text-white transition-all"
                                                >
                                                    Zur Kasse
                                                </a>

                                                <a
                                                    href={getShopwareUrl(
                                                        ShopwareURL.CART,
                                                    )}
                                                    class="mt-5 mt-5 inline-block w-full text-center"
                                                >
                                                    Warenkorb anzeigen
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="offcanvas-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    Ihr Warenkorb is leer
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
