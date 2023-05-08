import { useState } from 'preact/hooks';
import { getShopwareUrl } from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import {
    ShopwareApiInstanceStore,
    customerStore,
} from '../utils/shopware-store';
import { useStore } from '@nanostores/preact';
import { getCustomer, login } from '@shopware-pwa/shopware-6-client';

export default function LoginForm() {
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const [errorMessage, setErrorMessage] = useState('');

    const loginFunction = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        let inputElements = form.querySelectorAll('input');
        let formValues: any = {};

        inputElements.forEach(function (input: any) {
            if (input.value != '') {
                formValues[input.getAttribute('name')] = input.value;
                setErrorMessage('');
            } else {
                setErrorMessage('Bitte füllen Sie alle Felder aus.');
                customerStore.set(null);
            }
        });

        if (errorMessage == '') {
            let customerResponse = await login(
                formValues,
                contextInstance as any,
            )
                .catch((e) => {
                    customerStore.set(null);
                    setErrorMessage('E-Mail oder das Passwort ist falsch.');
                })
                .then((e) => {
                    if (e) {
                        loadCustomer(e);
                    }
                });
        }
        return false;
    };

    const loadCustomer = async (e: any) => {
        const getCustomerResponse = await getCustomer(
            {},
            contextInstance as any,
        );
        customerStore.set(getCustomerResponse);
    };

    return (
        <>
            <form id="login" method="post" onSubmit={(e) => loginFunction(e)}>
                <p>{errorMessage}</p>
                <br />
                <input
                    type="email"
                    name="username"
                    required={true}
                    placeholder="E-Mail"
                    class="border px-5 py-3"
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    required={true}
                    placeholder="Passwort"
                    class="border px-5 py-3"
                />
                <p class="mt-5">
                    <a
                        href={getShopwareUrl(ShopwareURL.PASSWORD_RECOVERY)}
                        class="text-blue-600"
                    >
                        Passwort vergessen?
                    </a>
                </p>
                <br />
                <button type="submit" class="border  px-5 py-3">
                    Login
                </button>
            </form>
        </>
    );
}
