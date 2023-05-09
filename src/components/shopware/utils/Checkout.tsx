// TODO
// Pflichtfleder prüfen bevor Bestellung abgeschickt wird (agbs)
// AGB link redaxo?

// Bezahlmethoden alle gleich?
// Stripe?
// Mollie?

import { getShopwareUrl } from '@components/shopware/helpers/client';
import { useEffect, useState } from 'preact/hooks';
import DefaultBillingAddress from '../atoms/DefaultBillingAddress';
import DefaultShippingAddress from '../atoms/DefaultShippingAddress';
import ShppingMethods from '../atoms/ShppingMethods';
import LineItemList from '../atoms/LineItemList';
import AddCoupon from '../atoms/AddCoupon';
import CheckoutSummary from '../atoms/CheckoutSummary';
import UserPaymetns from './UserPayments';
import { ShopwareURL } from '../helpers/url';
import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    cartStore,
    customerStore,
} from './shopware-store';
import {
    createOrder,
    getCart,
    handlePayment,
} from '@shopware-pwa/shopware-6-client';
import ChangeBillingAddress from '../atoms/ChangeBillingAddress';
import ChangeShippingAddress from '../atoms/ChangeShippingAddress';

export default function Checkout() {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const cart = useStore(cartStore);
    const [cartChanged, setCartChanged] = useState(false);
    const [showMessage, setShowMessage] = useState('');

    useEffect(() => {
        const _getCart = async () => {
            const _response = await getCart(contextInstance as any);

            if (_response.lineItems.length === 0) {
                window.location.href =
                    getShopwareUrl(ShopwareURL.CART) != undefined ||
                    getShopwareUrl(ShopwareURL.CART) != null
                        ? getShopwareUrl(ShopwareURL.CART)
                        : '/';
            }

            cartStore.set(_response);
        };
        if (contextInstance) {
            _getCart();
        }
    }, [cartChanged]);

    const [changeBillingAddress, setChangeBillingAddress] = useState(false); // change billing or delivery address
    const [changeShippingAddress, setChangeShippingAddress] = useState(false); // change billing or delivery address

    const changeAddressFunction = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'billing') {
            setChangeShippingAddress(false);
            setChangeBillingAddress(true);
        } else if (type === 'shipping') {
            setChangeBillingAddress(false);
            setChangeShippingAddress(true);
        } else {
            setChangeBillingAddress(false);
            setChangeShippingAddress(false);
        }
    };

    const closeOverlay = (e: any) => {
        e.preventDefault();
        setChangeBillingAddress(false);
        setChangeShippingAddress(false);
    };

    // create order from cart and handle payment
    const createOrderFromCart = async () => {
        const agbs = document.getElementById('agbs') as HTMLInputElement;
        if (!agbs.checked) {
            setShowMessage('Bitte akzeptieren Sie die AGBs');
            window.scrollTo(0, 0);
            return;
        }

        const base_url = window.location.origin;
        const finishUrl =
            base_url + getShopwareUrl(ShopwareURL.CHECKOUT_FINISHED);
        const errorUrl = finishUrl;
        const _response = await createOrder({}, contextInstance as any);
        const order = _response;

        if (order && order.id) {
            const orderPayment = await handlePayment(
                {
                    orderId: order.id,
                    finishUrl: finishUrl + '?orderId=' + order.id,
                    errorUrl: errorUrl + '?error=true',
                },
                contextInstance as any,
            );

            if (orderPayment.redirectUrl) {
                window.location.href = orderPayment.redirectUrl;
            } else {
                window.location.href = finishUrl;
            }
        }
    };

    return (
        <>
            {changeBillingAddress && (
                <>
                    <div
                        class="fixed left-0 top-0 z-50 w-full bg-black bg-opacity-50"
                        style="height: 100vh"
                        onClick={(e) => closeOverlay(e)}
                    ></div>
                    <ChangeBillingAddress
                        setFunction={setChangeBillingAddress}
                        closeOverlay={closeOverlay}
                    />
                </>
            )}

            {changeShippingAddress && (
                <>
                    <div
                        class="fixed left-0 top-0 z-50 w-full bg-black bg-opacity-50"
                        style="height: 100vh"
                        onClick={(e) => closeOverlay(e)}
                    ></div>
                    <ChangeShippingAddress
                        setFunction={setChangeShippingAddress}
                        closeOverlay={closeOverlay}
                    />
                </>
            )}

            {showMessage && (
                <>
                    <div
                        class="relative mb-3 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                        role="alert"
                    >
                        {showMessage}
                    </div>
                </>
            )}

            <div>
                <h1>Bestellung abschließen</h1>
                <div class="mb-2 mt-5 border-b pb-5 pt-5">
                    <label for="agbs">
                        <input
                            type="checkbox"
                            id="agbs"
                            name="agbs"
                            required={true}
                            class="mr-2"
                        />
                        Ich habe die AGB gelesen und bin mit ihnen
                        einverstanden.
                    </label>
                </div>

                <div class="mb-5 mt-5 flex">
                    <div class="mb-2 mt-5 w-[50%] pr-10">
                        <DefaultBillingAddress closeOverlay={undefined} />
                        <span
                            class="mt-5 block cursor-pointer border p-2 text-center"
                            onClick={(e) => changeAddressFunction(e, 'billing')}
                        >
                            Rechnungsadresse ändern
                        </span>
                    </div>
                    <div class="mb-2 mt-5 w-[50%] pr-10">
                        <DefaultShippingAddress closeOverlay={undefined} />
                        <span
                            class="mt-5 block cursor-pointer border p-2 text-center"
                            onClick={(e) =>
                                changeAddressFunction(e, 'shipping')
                            }
                        >
                            Lieferadresse ändern
                        </span>
                    </div>
                </div>

                <div class="mb-2 flex">
                    <div class="mb-2 mt-5 w-[50%] pr-10">
                        <UserPaymetns orderId={undefined} />
                    </div>
                    <div class="mb-2 mt-5 w-[50%] pr-10">
                        <ShppingMethods />
                    </div>
                </div>

                <div class="mb-25 flex">
                    <div class="w-5/12 px-5">Produkt</div>
                    <div class="w-2/12 px-5">Anzahl</div>
                    <div class="w-2/12 px-5">Stückpreis</div>
                    <div class="w-2/12 px-5">Summe</div>
                    <div class="w-1/12 px-5"></div>
                </div>

                <LineItemList lineItems={cart?.lineItems} />
                <div class="mb-20 ml-auto mt-20 w-[35%]">
                    <AddCoupon />

                    <CheckoutSummary />

                    <button
                        onClick={() => {
                            createOrderFromCart();
                        }}
                        class="mt-5 block w-full rounded border border-black bg-green-900 px-2 py-3 text-center text-white"
                    >
                        Zahlungspflichtig bestellen
                    </button>
                </div>
            </div>
        </>
    );
}
