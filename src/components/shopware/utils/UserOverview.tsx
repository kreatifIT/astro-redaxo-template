import { useStore } from '@nanostores/preact';
import { customerStore } from './shopware-store';
import UserMenu from '../atoms/UserMenu';
import { getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import DefaultBillingAddress from '../atoms/DefaultBillingAddress';
import DefaultShippingAddress from '../atoms/DefaultShippingAddress';

export default function UserOverview() {
    const customer = useStore(customerStore);

    return (
        <>
            <div class="row mt-5 mb-5">
                <div class="flex w-full flex-row flex-wrap">
                    <div class="w-[20%] pb-20">
                        <UserMenu />
                    </div>
                    <div class="w-[80%] pl-20">
                        <h1>Übersicht</h1>
                        <p>
                            Hier haben Sie direkten Zugriff auf Ihre
                            Profilinformationen, hinterlegte Adressen und die
                            Standard-Zahlungsart.
                        </p>

                        {customer && (
                            <>
                                <div class="mt-10 flex w-full flex-row flex-wrap">
                                    <div class="w-[50%] pr-10">
                                        <h2 class="mb-5 border-b pb-2 font-bold">
                                            Persönliche Daten
                                        </h2>
                                        <div class="">
                                            <p>
                                                {customer?.firstName}{' '}
                                                {customer.lastName}
                                            </p>
                                            <p>{customer.email}</p>

                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_PROFILE,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                Profil ändern
                                            </a>
                                        </div>
                                    </div>
                                    <div class="w-[50%] pl-10">
                                        <h2 class="mb-5 border-b pb-2 font-bold">
                                            Standard-Zahlungsarten
                                        </h2>
                                        <p class="font-bold">
                                            {
                                                customer.defaultPaymentMethod
                                                    .translated.name
                                            }
                                        </p>
                                        <p>
                                            {
                                                customer.defaultPaymentMethod
                                                    .translated.description
                                            }
                                        </p>
                                        <a
                                            href={getShopwareUrl(
                                                ShopwareURL.USER_PAYMENTS,
                                            )}
                                            class="mt-2 inline-block border p-2"
                                        >
                                            Zahlungsart ändern
                                        </a>
                                    </div>
                                </div>

                                <div class="mt-10 flex w-full flex-row flex-wrap">
                                    <div class="w-[50%] pr-10">
                                        <div class="">
                                            <DefaultBillingAddress
                                                closeOverlay={undefined}
                                            />
                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_ADDRESSES,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                Rechnungsadresse ändern
                                            </a>
                                        </div>
                                    </div>
                                    <div class="w-[50%] pl-10">
                                        <div>
                                            <DefaultShippingAddress
                                                closeOverlay={undefined}
                                            />
                                            <a
                                                href={getShopwareUrl(
                                                    ShopwareURL.USER_ADDRESSES,
                                                )}
                                                class="mt-2 inline-block border p-2"
                                            >
                                                Lieferadresse ändern
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
