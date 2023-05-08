import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';
import {
    deleteCustomerAddress,
    getCustomer,
    getSessionContext,
    setDefaultCustomerBillingAddress,
    setDefaultCustomerShippingAddress,
} from '@shopware-pwa/shopware-6-client';
import { getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';

interface Props {
    showChangeBilling: boolean;
    showChangeShipping: boolean;
    showButtons: boolean;
    setFunction: any | undefined;
}

export default function CustomerAddresses({
    showChangeBilling,
    showChangeShipping,
    showButtons,
    setFunction,
}: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const customer = useStore(customerStore);

    const getNewCustomer = async () => {
        const context = await getSessionContext(contextInstance as any);
        contextStore.set(context);
        const customer = await getCustomer(
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
        customerStore.set(customer);

        if (setFunction) {
            setFunction(false);
        }
    };

    const changeDefaultBillingAdress = async (e: any, addressId: string) => {
        e.preventDefault();
        await setDefaultCustomerBillingAddress(
            addressId,
            contextInstance as any,
        );
        getNewCustomer();
        return false;
    };

    const changeDefaultShippingAdress = async (e: any, addressId: string) => {
        e.preventDefault();
        await setDefaultCustomerShippingAddress(
            addressId,
            contextInstance as any,
        );
        getNewCustomer();
        return false;
    };

    const removeAddress = async (e: any, addressId: string) => {
        e.preventDefault();
        await deleteCustomerAddress(addressId, contextInstance as any);
        getNewCustomer();
        return false;
    };

    return (
        <>
            <div class="w-[100%]">
                <h2 class="mb-5 border-b pb-2 font-bold">Alle Adressen</h2>
            </div>
            {customer?.addresses?.map((address: any) => (
                <>
                    <div class="mt-5 w-[50%] pr-10">
                        <div>
                            {address.company && (
                                <p class="mb-2">
                                    {address.company}{' '}
                                    {address.department && (
                                        <>
                                            {' - '}
                                            {address.department}
                                        </>
                                    )}
                                </p>
                            )}
                            <p>
                                {address.firstName + ' '}
                                {address.lastName}
                            </p>
                            <p>{address.street}</p>
                            <p>
                                {address.zipcode} {address.city}
                            </p>
                            <p>{address.country.translated.name}</p>
                        </div>
                        <div class="mt-5">
                            {showChangeBilling &&
                                address.id !=
                                    customer.defaultBillingAddress.id && (
                                    <button
                                        onClick={(e) =>
                                            changeDefaultBillingAdress(
                                                e,
                                                address.id,
                                            )
                                        }
                                        class="mb-2 bg-gray-300 p-2 text-left"
                                    >
                                        Als Standard-Rechnungsadresse verwenden
                                    </button>
                                )}
                            {showChangeShipping &&
                                address.id !=
                                    customer.defaultShippingAddress.id && (
                                    <button
                                        onClick={(e) =>
                                            changeDefaultShippingAdress(
                                                e,
                                                address.id,
                                            )
                                        }
                                        class="bg-gray-300 p-2 text-left"
                                    >
                                        Als Standard-Lieferadresse verwenden
                                    </button>
                                )}
                        </div>
                        {showButtons && (
                            <div class="mt-5 flex flex-wrap">
                                <a
                                    href={
                                        getShopwareUrl(
                                            ShopwareURL.USER_ADDRESS_CREATE,
                                        ) +
                                        '?address=' +
                                        address.id
                                    }
                                    class="mr-2 border px-5 py-3"
                                >
                                    Bearbeiten
                                </a>
                                {address.id !=
                                    customer.defaultShippingAddress.id &&
                                    address.id !=
                                        customer.defaultBillingAddress.id && (
                                        <button
                                            class="border px-5 py-2"
                                            onClick={(e) =>
                                                removeAddress(e, address.id)
                                            }
                                        >
                                            Löschen
                                        </button>
                                    )}
                            </div>
                        )}
                    </div>
                </>
            ))}
        </>
    );
}
