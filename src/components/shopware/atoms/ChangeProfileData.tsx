import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';
import {
    CustomerUpdateProfileParam,
    getAvailableSalutations,
    getSessionContext,
    updateProfile,
} from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function ChangeProfileData() {
    const customer: any = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [salutations, setSalutations] = useState([]);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    useEffect(() => {
        if (contextInstance) {
            const getSalutations = async () => {
                const response = await getAvailableSalutations(
                    contextInstance as any,
                );
                setSalutations(response);
            };
            getSalutations();
        }
    }, [contextInstance]);

    const changeProfileData = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const _response = await updateProfile(
            {
                salutationId: formData.get('salutation'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                title: '',
            } as CustomerUpdateProfileParam,
            contextInstance as any,
        );
        const context = await getSessionContext(contextInstance as any);
        contextStore.set(context);
        customerStore.set(context.customer);

        return false;
    };

    return (
        <>
            <form onSubmit={(e) => changeProfileData(e)}>
                <div class="flex flex-row flex-wrap">
                    <div class="w-[50%]">
                        <label class="block text-sm font-medium text-gray-700">
                            {t('salutation')}
                            {t('mandatory')}
                        </label>
                        <select
                            id="salutation"
                            name="salutation"
                            autocomplete="salutation"
                            class="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {salutations?.elements?.map((salutation: any) => (
                                <option value={salutation.id}>
                                    {salutation.translated.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="w-[50%]"></div>
                    <div class="mt-5 w-[50%]">
                        <label class="block text-sm font-medium text-gray-700">
                            {t('firstname')}
                            {t('mandatory')}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            autocomplete="given-name"
                            class="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={customer?.firstName}
                        />
                    </div>
                    <div class="mt-5 w-[50%] pl-5">
                        <label class="block text-sm font-medium text-gray-700">
                            {t('lastname')}
                            {t('mandatory')}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            autocomplete="family-name"
                            class="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={customer?.lastName}
                        />
                    </div>

                    <div>
                        <p class="mt-5">{t('label_mandatory_fields')}</p>

                        <button
                            class="mt-5 inline-block border p-2"
                            type="submit"
                        >
                            {t('save_adjustments')}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
