import { useState } from 'preact/hooks';
import DefaultBillingAddress from '../atoms/DefaultBillingAddress';
import DefaultShippingAddress from '../atoms/DefaultShippingAddress';
import CustomerAddresses from '../atoms/CustomerAddresses';

export default function UserAddress() {
    return (
        <>
            {/* {billingAdressChanged && (
                <div class="relative mt-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    <span class="block sm:inline">
                        Ihre Standard-Rechnungsadresse wurde geändert.
                    </span>
                </div>
            )}
            {shippingAdressChanged && (
                <div class="relative mt-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    <span class="block sm:inline">
                        Ihre Standard-Lieferadresse wurde geändert.
                    </span>
                </div>
            )}
            {addressRemoved && (
                <div class="relative mt-5 w-[100%] rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    <span class="block sm:inline">
                        Ihre Adresse wurde gelöscht.
                    </span>
                </div>
            )} */}

            <div class="">
                <h2 class="mb-5 border-b pb-2 font-bold">Adressen</h2>
                <p>
                    Ändern Sie Ihre Standard-Adressen oder fügen Sie neue hinzu.
                </p>
            </div>
            <div class="mt-10 flex flex-row flex-wrap">
                <div class="w-[50%] pr-5">
                    <DefaultBillingAddress closeOverlay={undefined} />
                </div>
                <div class="w-[50%] pl-5">
                    <DefaultShippingAddress closeOverlay={undefined} />
                </div>
            </div>

            <div class="mt-10 flex flex-row flex-wrap">
                <a
                    href="/de/shop/account/address/create"
                    class="border px-5 py-3"
                >
                    Neue Adresse hinzufügen
                </a>
            </div>

            <div class="mt-10 flex flex-row flex-wrap">
                <CustomerAddresses
                    showChangeBilling={true}
                    showChangeShipping={true}
                    showButtons={true}
                    setFunction={undefined}
                />
            </div>
        </>
    );
}
