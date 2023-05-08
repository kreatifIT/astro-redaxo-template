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

export default function ChangeProfileData() {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [successMessage, setSuccessMessage] = useState('');
    const [salutations, setSalutations] = useState([]);

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
            {successMessage && (
                <>
                    <div
                        class="mb-4 flex rounded-lg bg-green-100 p-4 text-sm text-green-700"
                        role="alert"
                    >
                        <svg
                            class="mr-3 inline h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <div>{successMessage}</div>
                    </div>
                </>
            )}

            <form onSubmit={(e) => changeProfileData(e)}>
                <div class="flex flex-row flex-wrap">
                    <div class="w-[50%]">
                        <label class="block text-sm font-medium text-gray-700">
                            Salutation*
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
                            Vorname*
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
                            Nachname*
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
                        <p class="mt-5">
                            Die mit einem Stern (*) markierten Felder sind
                            Pflichtfelder.
                        </p>

                        <button
                            class="mt-5 inline-block border p-2"
                            type="submit"
                        >
                            Änderungen speichern
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
