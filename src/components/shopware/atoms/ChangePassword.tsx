import { useStore } from '@nanostores/preact';
import {
    CustomerUpdatePasswordParam,
    getSessionContext,
    updatePassword,
} from '@shopware-pwa/shopware-6-client';
import { useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';

export default function ChangePassword() {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [errorChangePassword, setErrorChangePassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const afterPasswordChanged = async () => {
        const context = await getSessionContext(contextInstance as any);
        contextStore.set(context);
        customerStore.set(context.customer);
    };

    const changePassword = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newPasword = formData.get('new_password');
        const confirmNewPasword = formData.get('confirm_password');
        const oldPasword = formData.get('old_password');

        if (newPasword === '' || newPasword != confirmNewPasword) {
            setErrorChangePassword('neue Passwörter stimmen nicht überein');
        } else if (oldPasword === '') {
            setErrorChangePassword('Bitte das Aktuelle Passwort eingeben');
        } else {
            await updatePassword(
                {
                    password: oldPasword,
                    newPassword: newPasword,
                    newPasswordConfirm: confirmNewPasword,
                } as CustomerUpdatePasswordParam,
                contextInstance as any,
            )
                .then((e: any) => {
                    setSuccessMessage('Passwort wurde erfolgreich geändert');
                    afterPasswordChanged();
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 5000);
                })
                .catch((e: any) => {
                    setErrorChangePassword('Bitte überprüfe die Eingabe');
                    setTimeout(() => {
                        setErrorChangePassword('');
                    }, 5000);
                });
        }

        return false;
    };

    return (
        <>
            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">Passwort</h2>

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

                {errorChangePassword && (
                    <>
                        <div
                            class="mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700"
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
                            <div>{errorChangePassword}</div>
                        </div>
                    </>
                )}

                <form method="post" onSubmit={(e) => changePassword(e)}>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="new_password">Neues Passwort*</label>
                            <input
                                type="password"
                                class="block w-full border"
                                name="new_password"
                                id="new_password"
                            />
                        </div>
                        <div class="w-[50%] pl-5">
                            <label for="confirm_password">
                                Passwort-Bestätigung*
                            </label>
                            <input
                                id="confirm_password"
                                class="block w-full border"
                                type="password"
                                name="confirm_password"
                            />
                        </div>
                    </div>
                    <div class="mt-5 mb-5 w-[100%]">
                        <p>
                            Bitte geben Sie Ihr aktuelles Passwort ein, um die
                            Änderungen zu bestätigen.
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="old_password">
                                Aktuelles Passwort*
                            </label>
                            <input
                                type="password"
                                class="block w-full border"
                                name="old_password"
                                id="old_password"
                            />
                        </div>
                    </div>
                    <div class="mt-5 mb-5 w-[100%]">
                        <p>
                            Die mit einem Stern (*) markierten Felder sind
                            Pflichtfelder.
                        </p>
                        <button
                            type="submit"
                            class="mt-5 inline-block border p-2"
                        >
                            Änderungen speichern
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
