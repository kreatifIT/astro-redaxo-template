import { useEffect, useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from './shopware-store';
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

interface Props {
    orderId: string | undefined;
}

export default function UserPaymetns({ orderId }: Props) {
    const customer: any = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const context = useStore(contextStore);

    const [successMessage, setSuccessMessage] = useState('');
    const [paymentMethods, setPaymentMethods] = useState<any>([]);
    const [initLoading, setInitLoading] = useState(false);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('');

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    if (contextInstance) {
        setInitLoading(true);
    }

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
        if (contextInstance) {
            _getPaymentMethods(contextInstance, setPaymentMethods);
        }
    }, [initLoading]);

    const _changeDefaultPaymentMethod = async (e: any) => {
        e.preventDefault();
        let contextToken = contextInstance.config.contextToken;
        let swLangId = contextInstance.config.languageId;

        setDefaultPaymentMethod(e.target.value);

        const _response = await setCurrentPaymentMethod(
            e.target.value,
            contextInstance as any,
        );

        const _responseCustomer = await changeDefaultPaymentMethod(
            e.target.value,
            contextToken,
            swLangId,
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

        setSuccessMessage('Zahlungsart wurde erfolgreich geändert.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        return false;
    };

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">{t('payment_method')}</h2>
            {successMessage && (
                <div class="relative mb-5 mt-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    <span class="block sm:inline">{successMessage}</span>
                </div>
            )}
            {paymentMethods?.elements?.map((paymentMethod: any) => (
                <div class="mb-10">
                    <div class="flex flex-wrap">
                        <div class="flex-auto grow-0">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={paymentMethod.id}
                                id={paymentMethod.translated.name}
                                onChange={(e) => _changeDefaultPaymentMethod(e)}
                                checked={
                                    paymentMethod.id === defaultPaymentMethod
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
                </div>
            ))}
        </>
    );
}
