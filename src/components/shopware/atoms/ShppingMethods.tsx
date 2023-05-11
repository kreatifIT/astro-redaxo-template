import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    cartStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';
import {
    getAvailableShippingMethods,
    getCart,
    getSessionContext,
    setCurrentShippingMethod,
} from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function ShppingMethods() {
    const customer = useStore(customerStore);
    const context: any = useStore(contextStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [shippingMethods, setShippingMethods] = useState<any>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    useEffect(() => {
        const _getShippingMethods = async (setShippingMethods: any) => {
            const _response = await getAvailableShippingMethods(
                contextInstance as any,
            );
            setShippingMethods(_response);
        };
        if (contextInstance) {
            _getShippingMethods(setShippingMethods);
        }
    }, [contextInstance]);

    const changeShippingMethod = async (e: any) => {
        e.preventDefault();
        const _contextReponse = await setCurrentShippingMethod(
            e.target.value,
            contextInstance as any,
        );
        const _responseContext = await getSessionContext(
            contextInstance as any,
        );
        contextStore.set(_responseContext);

        const _response = await getCart(contextInstance as any);
        cartStore.set(_response);

        setSuccessMessage('Liefermethode wurde aktualisiert.');

        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
        return false;
    };

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                {t('delivery_methods')}
            </h2>
            {successMessage && (
                <div class="relative mb-5 mt-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    <span class="block sm:inline">{successMessage}</span>
                </div>
            )}

            {shippingMethods?.elements?.map((shippingMethod: any) => (
                <div class="flex pb-2 pt-2">
                    <div class="w-1/12 px-5">
                        <input
                            type="radio"
                            name="shippingMethod"
                            value={shippingMethod.id}
                            id={shippingMethod.id}
                            onChange={(e) => changeShippingMethod(e)}
                            checked={
                                context?.shippingMethod?.id ===
                                shippingMethod.id
                                    ? true
                                    : false
                            }
                            required={true}
                        />
                    </div>
                    <div class="w-11/12">
                        <label for={shippingMethod.id}>
                            {shippingMethod.translated.name}
                            <br />
                            <span class="small text-gray-400">
                                {shippingMethod.translated.description}
                            </span>
                        </label>
                    </div>
                </div>
            ))}
        </>
    );
}
