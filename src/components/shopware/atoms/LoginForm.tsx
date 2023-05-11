import { useState } from 'preact/hooks';
import {
    getClangCodeFromCookie,
    getShopwareUrl,
} from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import {
    ShopwareApiInstanceStore,
    customerStore,
} from '../utils/shopware-store';
import { useStore } from '@nanostores/preact';
import { getCustomer, login } from '@shopware-pwa/shopware-6-client';
import useTranslations from '@helpers/translations/client';

export default function LoginForm() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [errorMessage, setErrorMessage] = useState('');

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

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
                setErrorMessage(t('error_fill_all_fields'));
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
                    setErrorMessage(t('error_email_or_password'));
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
                    placeholder={t('email')}
                    class="border px-5 py-3"
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    required={true}
                    placeholder={t('password')}
                    class="border px-5 py-3"
                />
                <p class="mt-5">
                    <a
                        href={getShopwareUrl(ShopwareURL.PASSWORD_RECOVERY)}
                        class="text-blue-600"
                    >
                        {t('forgot_password')}
                    </a>
                </p>
                <br />
                <button type="submit" class="border  px-5 py-3">
                    {t('login')}
                </button>
            </form>
        </>
    );
}
