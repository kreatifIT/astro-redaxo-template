import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from './shopware-store';
import { resetPassword } from '@shopware-pwa/shopware-6-client';
import { getClangCodeFromCookie, getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';
import useTranslations from '@helpers/translations/client';

export default function RecoveryForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const [mailSend, setMailSend] = useState(false);
    const contextInstance: any = useStore(ShopwareApiInstanceStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const validateEmail = (email: any) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const recoveryFunction = async (e: any) => {
        e.preventDefault();
        // disable button
        e.target.disabled = true;
        const form = document.getElementById('recoveryForm') as HTMLFormElement;
        var formData = new FormData(form);

        if (formData.get('email') && validateEmail(formData.get('email'))) {
            setErrorMessage('');

            let storefrontUrl =
                window.location.origin + getShopwareUrl(ShopwareURL.SHOP_ROOT);
            storefrontUrl = storefrontUrl.replace(/\/$/, '');

            await resetPassword(
                {
                    email: formData.get('email') as string,
                    storefrontUrl: storefrontUrl,
                },
                contextInstance,
            );
            setMailSend(true);
        } else {
            setErrorMessage(t('invalid_email'));
        }
        e.target.disabled = false;
        return;
    };

    return (
        <>
            <div class="mb-20 mt-10 flex">
                <div class="ml-auto mr-auto w-[50%] pl-5">
                    <h2 class="mb-2 border-b pb-2">
                        <b>{t('password_recovery_headline')}</b>
                    </h2>
                    <p>{t('password_recovery_text')}</p>
                    {mailSend ? (
                        <>
                            <div class="mt-5 bg-green-600 p-2 text-center text-white">
                                <p>{t('password_recovery_mail_send_text')}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>{errorMessage ? errorMessage : ''}</p>

                            <form id="recoveryForm" class="mt-5">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t('email')}
                                    class="block w-full border px-3 py-2"
                                />
                                <button
                                    type="submit"
                                    class="mt-2 border px-5 py-2"
                                    onClick={(e) => recoveryFunction(e)}
                                >
                                    {t('send')}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
