import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import {
    createCustomerAddress,
    getAvailableCountries,
    getAvailableSalutations,
    getCustomer,
    updateCustomerAddress,
} from '@shopware-pwa/shopware-6-client';
import { ShopwareURL, getShopwareUrlByLang } from '../helpers/url';

interface Props {
    redirect: boolean;
    setFunction: any | undefined;
    addressId: string | undefined;
}

export default function UserAddressCreateModify({
    redirect,
    setFunction,
    addressId,
}: Props) {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [salutations, setSalutations] = useState<any>([]);
    const [countries, setCountries] = useState<any>([]);
    const [address, setAddress] = useState<any>(undefined);

    useEffect(() => {
        if (contextInstance) {
            const _getSalutations = async (
                contextInstance: any,
                setSalutations: any,
            ) => {
                const _response = await getAvailableSalutations(
                    contextInstance as any,
                );

                setSalutations(_response);
            };

            const _getCountries = async (
                contextInstance: any,
                setCountries: any,
            ) => {
                const _response = await getAvailableCountries(
                    contextInstance as any,
                );
                setCountries(_response);
            };

            _getSalutations(contextInstance, setSalutations);
            _getCountries(contextInstance, setCountries);

            console.log('addressId', addressId);
            if (addressId) {
                console.log('customer', customer);
                let address = customer?.addresses.find(
                    (a: any) => a.id === addressId,
                );
                setAddress(address);
            }
        }
    }, [contextInstance, customer]);

    const createAddress = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let additionalUrl = '';
        if (address && address.id) {
            await updateCustomerAddress(
                {
                    id: address.id,
                    customerId: customer.id,
                    countryId: formData.get('country'),
                    salutationId: formData.get('salutation'),
                    firstName: formData.get('firstname'),
                    lastName: formData.get('lastname'),
                    zipcode: formData.get('zipcode'),
                    city: formData.get('city'),
                    street: formData.get('street'),
                },
                contextInstance as any,
            );
            additionalUrl = '?mod=updated';
        } else {
            await createCustomerAddress(
                {
                    customerId: customer.id,
                    countryId: formData.get('country'),
                    salutationId: formData.get('salutation'),
                    firstName: formData.get('firstname'),
                    lastName: formData.get('lastname'),
                    zipcode: formData.get('zipcode'),
                    city: formData.get('city'),
                    street: formData.get('street'),
                },
                contextInstance as any,
            );
            additionalUrl = '?mod=created';
        }

        if (redirect !== false) {
            const redirectUrl =
                getShopwareUrlByLang('de', ShopwareURL.USER_ADDRESSES) +
                additionalUrl;
            window.location.href = redirectUrl;
        }

        const _customer = await getCustomer(
            {
                associations: {
                    defaultBillingAddress: {
                        associations: {
                            country: {},
                        },
                    },
                    defaultShippingAddress: {
                        associations: {
                            country: {},
                        },
                    },
                    addresses: {
                        associations: {
                            country: {},
                        },
                    },
                    defaultPaymentMethod: {},
                },
            },
            contextInstance as any,
        );
        customerStore.set(_customer);
        if (setFunction) {
            setFunction(false);
        }

        return false;
    };

    return (
        <>
            <div class="">
                <h2 class="mb-5 border-b pb-2 font-bold">Neue Adresse</h2>

                <form method={'post'} onSubmit={(e) => createAddress(e)}>
                    <div class="flex flex-row flex-wrap">
                        <div class="w-[50%] pr-5">
                            <label for="salutation">Anrede</label>
                            <select
                                name="salutation"
                                required={true}
                                class="block border px-5  py-3"
                            >
                                {!address && (
                                    <>
                                        <option disabled={true} selected={true}>
                                            Anrede eingeben ...
                                        </option>
                                    </>
                                )}
                                {salutations?.elements?.map(
                                    (salutation: any) => (
                                        <option
                                            value={salutation.id}
                                            selected={
                                                address?.salutationId ===
                                                salutation.id
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {salutation.translated.displayName}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>
                    </div>
                    <div class="mt-5 flex flex-row flex-wrap">
                        <div class="w-[50%] pr-5">
                            <label for="firstname">Vorname*</label>
                            <input
                                type="text"
                                name="firstname"
                                required={true}
                                value={address?.firstName}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[50%] pl-5">
                            <label for="lastname">Nachname*</label>
                            <input
                                type="text"
                                name="lastname"
                                required={true}
                                value={address?.lastName}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                    </div>
                    <div class="mt-5 flex flex-row flex-wrap">
                        <div class="w-[50%] pr-5">
                            <label for="street">Straße und Hausnummer*</label>
                            <input
                                type="text"
                                name="street"
                                required={true}
                                value={address?.street}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[20%] pl-5">
                            <label for="zipcode">PLZ*</label>
                            <input
                                type="text"
                                name="zipcode"
                                required={true}
                                value={address?.zipcode}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[30%] pl-5">
                            <label for="city">Ort*</label>
                            <input
                                type="text"
                                name="city"
                                required={true}
                                value={address?.city}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                    </div>
                    <div class="mt-5 flex flex-row flex-wrap">
                        <div class="w-[50%] pr-5">
                            <label for="country">Land*</label>
                            <select
                                name="country"
                                required={true}
                                class="block w-full border  px-5 py-3"
                            >
                                {!address && (
                                    <>
                                        <option
                                            disabled={true}
                                            value=""
                                            selected={true}
                                        >
                                            Land auswählen ...
                                        </option>
                                    </>
                                )}
                                {countries?.elements?.map((country: any) => (
                                    <option
                                        value={country.id}
                                        selected={
                                            address?.country.id === country.id
                                        }
                                    >
                                        {country.translated.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div class="mt-5">
                        <p>
                            Die mit einem Stern (*) markierten Felder sind
                            Pflichtfelder.
                        </p>

                        <button type="submit" class="mt-5 border px-5 py-2">
                            Adresse speichern
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
