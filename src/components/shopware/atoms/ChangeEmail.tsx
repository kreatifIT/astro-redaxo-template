import { useStore } from '@nanostores/preact';
import {
    CustomerUpdateEmailParam,
    getSessionContext,
    updateEmail,
} from '@shopware-pwa/shopware-6-client';
import { useState } from 'preact/hooks';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';

export default function ChangeEmail() {
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [errorChangeEmail, setErrorChangeEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const afterEmailChange = async () => {
        const context = await getSessionContext(contextInstance as any);
        contextStore.set(context);
        customerStore.set(context.customer);
    };

    const changeEmail = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const confirm_email = formData.get('confirm_email');
        const pwd = formData.get('password');

        let hasError = false;
        if (email == '' || email != confirm_email) {
            setErrorChangeEmail('Die Email Addressen stimmen nicht überein');
        } else {
            await updateEmail(
                {
                    email: email,
                    emailConfirmation: confirm_email,
                    password: pwd,
                } as CustomerUpdateEmailParam,
                contextInstance as any,
            )
                .catch((e) => {
                    setErrorChangeEmail('Bitte kontrollieren Sie ihre Eingabe');
                    hasError = true;
                })
                .then((e: any) => {
                    if (hasError === false) {
                        afterEmailChange();
                        setErrorChangeEmail('');
                        setSuccessMessage(
                            'Email Addresse wurde erfolgreich geändert',
                        );
                        afterEmailChange();
                        setTimeout(() => {
                            setSuccessMessage('');
                        }, 5000);
                    }
                });
        }

        return false;
    };

    return (
        <>
            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">E-Mail-Adresse</h2>

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

                {errorChangeEmail && (
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
                            <div>{errorChangeEmail}</div>
                        </div>
                    </>
                )}

                <form method="post" onSubmit={(e) => changeEmail(e)}>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="email">Neue E-Mail-Adresse*</label>
                            <input
                                type="email"
                                class="block w-full border"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div class="w-[50%] pl-5">
                            <label for="confirm_mail">
                                E-Mail-Bestätigung*
                            </label>
                            <input
                                id="confirm_mail"
                                class="block w-full border"
                                type="email"
                                name="confirm_email"
                            />
                        </div>
                    </div>
                    <div class="mb-5 mt-5 w-[100%]">
                        <p>
                            Bitte geben Sie Ihr aktuelles Passwort ein, um die
                            Änderungen zu bestätigen.
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="password">Passwort*</label>
                            <input
                                type="password"
                                class="block w-full border"
                                name="password"
                                id="password"
                            />
                        </div>
                    </div>
                    <div class="mb-5 mt-5 w-[100%]">
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
