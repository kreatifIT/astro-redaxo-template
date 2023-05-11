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
import useTranslations from '@helpers/translations/client';
import { getClangCodeFromCookie } from '../helpers/client';

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
    const customer: any = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [salutations, setSalutations] = useState<any>([]);
    const [countries, setCountries] = useState<any>([]);
    const [address, setAddress] = useState<any>(undefined);

    const [loadData, setLoadData] = useState(false);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    if (contextInstance && customer) {
        setLoadData(true);
    }

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

            if (addressId) {
                let address = customer?.addresses.find(
                    (a: any) => a.id === addressId,
                );
                setAddress(address);
            }
        }
    }, [loadData]);

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
                <h2 class="mb-5 border-b pb-2 font-bold">{t('new_address')}</h2>

                <form method={'post'} onSubmit={(e) => createAddress(e)}>
                    <div class="flex flex-row flex-wrap">
                        <div class="w-[50%] pr-5">
                            <label for="salutation">{t('salutation')}</label>
                            <select
                                name="salutation"
                                required={true}
                                class="block border px-5  py-3"
                            >
                                {!address && (
                                    <>
                                        <option disabled={true} selected={true}>
                                            {t('salutation')}
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
                            <label for="firstname">
                                {t('firstname')} {t('mandatory')}
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                required={true}
                                value={address?.firstName}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[50%] pl-5">
                            <label for="lastname">
                                {t('lastname')} {t('mandatory')}
                            </label>
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
                            <label for="street">
                                {t('street_and_number')} {t('mandatory')}
                            </label>
                            <input
                                type="text"
                                name="street"
                                required={true}
                                value={address?.street}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[20%] pl-5">
                            <label for="zipcode">
                                {t('zipcode')} {t('mandatory')}
                            </label>
                            <input
                                type="text"
                                name="zipcode"
                                required={true}
                                value={address?.zipcode}
                                class="block w-full border px-5 py-3"
                            />
                        </div>
                        <div class="w-[30%] pl-5">
                            <label for="city">
                                {t('city')} {t('mandatory')}
                            </label>
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
                            <label for="country">
                                {t('country')} {t('mandatory')}
                            </label>
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
                                            {t('select_country')}
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
                        <p>{t('label_mandatory_fields')}</p>

                        <button type="submit" class="mt-5 border px-5 py-2">
                            {t('save_address')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
