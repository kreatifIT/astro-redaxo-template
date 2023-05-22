import { useEffect, useState } from 'preact/hooks';
import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import { useStore } from '@nanostores/preact';
import {
    changeOrderPaymentMethod,
    getAvailablePaymentMethods,
    getCustomer,
    setCurrentPaymentMethod,
} from '@shopware-pwa/shopware-6-client';
import { changeDefaultPaymentMethod } from '@adapters/shopware';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';
import { toast } from 'react-toastify';

interface Props {
    orderId: string | undefined;
}

export default function UserPaymetns({ orderId }: Props) {
    const customer: any = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const [paymentMethods, setPaymentMethods] = useState<any>([]);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('');

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    useEffect(() => {
        if (customer) {
            setDefaultPaymentMethod(customer.defaultPaymentMethodId);
        }
    }, [customer]);

    useEffect(() => {
        const _getPaymentMethods = async (
            contextInstance: any,
            setPaymentMethods: any,
        ) => {
            const _response = await getAvailablePaymentMethods(contextInstance);

            setPaymentMethods(_response);
        };
        _getPaymentMethods(contextInstance, setPaymentMethods);
    }, []);

    const _changeDefaultPaymentMethod = async (e: any) => {
        e.preventDefault();
        let contextToken = contextInstance.config.contextToken;
        let swLangId = contextInstance.config.languageId;

        const _response = await setCurrentPaymentMethod(
            e.target.value,
            contextInstance as any,
        );

        const _responseCustomer = await changeDefaultPaymentMethod(
            e.target.value,
            contextToken as string,
            swLangId as string,
        );

        if (orderId) {
            const _responseOrder = await changeOrderPaymentMethod(
                orderId,
                e.target.value,
                contextInstance as any,
            );
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

        toast.success(t('payment_method_changed_successfully'));

        return false;
    };

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">{t('payment_method')}</h2>

            {paymentMethods?.elements?.map((paymentMethod: any) => (
                <>
                    <div class="mb-10">
                        <div class="flex flex-wrap">
                            <div class="flex-auto grow-0">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={paymentMethod.id}
                                    id={paymentMethod.translated.name}
                                    onChange={(e) =>
                                        _changeDefaultPaymentMethod(e)
                                    }
                                    checked={
                                        paymentMethod.id ===
                                        defaultPaymentMethod
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div class="ml-5 flex-1">
                                <label
                                    class="font-bold"
                                    for={paymentMethod.translated.name}
                                >
                                    {paymentMethod.translated.name}
                                </label>
                                <p>{paymentMethod.translated.description}</p>
                            </div>
                        </div>

                        {paymentMethod.id === defaultPaymentMethod &&
                            paymentMethod.shortName ===
                                'stripe.shopware_payment.payment_handler.card' && (
                                <div class="mt-5">
                                    <form
                                        method={'POST'}
                                        id={'stripe-credit-card-form'}
                                    >
                                        <div class="flex flex-wrap">
                                            <div class={'w-full pr-5 md:w-1/2'}>
                                                <label>Karteninhaber *</label>
                                                <input
                                                    type="text"
                                                    required={true}
                                                    name={'cardholder'}
                                                    class="mb-3 w-full rounded border border-gray-300 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                                                />
                                            </div>
                                            <div class={'w-full pl-5 md:w-1/2'}>
                                                <label>Kartennummer *</label>
                                                {/* TODO Kreatidkarten Input feld 4 x 4 Zahlen mit Leerzeichen dazwischen  */}
                                                <input
                                                    type="number"
                                                    max={8}
                                                    min={8}
                                                    required={true}
                                                    name={'cardnumber'}
                                                    class="mb-3 w-full rounded border border-gray-300 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                                                />
                                            </div>
                                            <div class={'w-full pr-5 md:w-1/2'}>
                                                <label>
                                                    Gültig bis (Monat/Jahr) *
                                                </label>
                                                <input
                                                    type="text"
                                                    required={true}
                                                    name={'cardexpiry'}
                                                    class="mb-3 w-full rounded border border-gray-300 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                                                />
                                            </div>
                                            <div class={'w-full pl-5 md:w-1/2'}>
                                                <label>CSC *</label>
                                                <input
                                                    type="text"
                                                    required={true}
                                                    name={'cardcvc'}
                                                    class="mb-3 w-full rounded border border-gray-300 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                    </div>
                </>
            ))}
        </>
    );
}
