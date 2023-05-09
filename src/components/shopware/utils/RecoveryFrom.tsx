// TODO Customer Email Recovery+
// langCode and swLangId are global variables

import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from './shopware-store';
import { contextStore } from './shopware-store';
import {
    ShopwareApiInstance,
    resetPassword,
} from '@shopware-pwa/shopware-6-client';
import { getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';

export default function RecoveryForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const [mailSend, setMailSend] = useState(false);
    const contextInstance: any = useStore(ShopwareApiInstanceStore);

    const validateEmail = (email: any) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const recoveryFunction = async (e: any) => {
        e.preventDefault();
        const form = document.getElementById('recoveryForm') as HTMLFormElement;
        var formData = new FormData(form);

        if (formData.get('email') && validateEmail(formData.get('email'))) {
            setErrorMessage('');

            let storefrontUrl =
                window.location.origin + getShopwareUrl(ShopwareURL.SHOP_ROOT);
            storefrontUrl = storefrontUrl.replace(/\/$/, '');

            const _response = await resetPassword(
                {
                    email: formData.get('email') as string,
                    storefrontUrl: storefrontUrl,
                },
                contextInstance,
            );
            setMailSend(true);
        } else {
            setErrorMessage('Bitte geben Sie eine gültige E-Mail Adresse an.');
        }

        return;
    };

    return (
        <>
            {mailSend ? (
                <>
                    <div class="mt-5 bg-green-600 p-2 text-center text-white">
                        <p>
                            Sie erhalten eine E-Mail wenn Sie eine gültige
                            E-Mail Adresse angegeben haben.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <p>{errorMessage ? errorMessage : ''}</p>

                    <form id="recoveryForm" class="mt-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            class="block w-full border px-3 py-2"
                        />
                        <button
                            type="submit"
                            class="mt-2 border px-5 py-2"
                            onClick={(e) => recoveryFunction(e)}
                        >
                            Senden
                        </button>
                    </form>
                </>
            )}
        </>
    );
}
