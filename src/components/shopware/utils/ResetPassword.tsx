import { useState } from 'preact/hooks';
import {
    getClangCodeFromCookie,
    getShopwareUrl,
} from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import {
    ShopwareApiInstance,
    confirmPasswordReset,
} from '@shopware-pwa/shopware-6-client';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore } from './shopware-store';
import useTranslations from '@helpers/translations/client';

interface Props {
    pwHash: string;
}

export default function ResetPassword({ pwHash }: Props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const contextInstance: ShopwareApiInstance = useStore(
        ShopwareApiInstanceStore,
    );
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const recoveryFunction = async (e: any) => {
        e.preventDefault();

        const form = document.getElementById('recoveryForm') as HTMLFormElement;
        var formData = new FormData(form);

        if (formData.get('password') && formData.get('c_password')) {
            if (formData.get('password') === formData.get('c_password')) {
                setErrorMessage('Anfrage wird gesendet');

                const _resetPassword = await confirmPasswordReset(
                    {
                        hash: pwHash,
                        newPassword: formData.get('password') as string,
                        newPasswordConfirm: formData.get('c_password'),
                    },
                    contextInstance,
                )
                    .then((e) => {
                        window.location.href = getShopwareUrl(
                            ShopwareURL.REGISTRATION,
                        )
                            ? getShopwareUrl(ShopwareURL.REGISTRATION)
                            : '/';
                    })
                    .catch((e) => {
                        if (
                            e.messages[0].code ==
                            'CHECKOUT__CUSTOMER_RECOVERY_HASH_EXPIRED'
                        ) {
                            setErrorMessage('');
                            setError(true);
                        } else {
                            setErrorMessage(t('check_input'));
                        }
                    });
            } else {
                setErrorMessage(t('password_not_match'));
            }
        } else {
            setErrorMessage(t('enter_valid_password'));
        }
        return false;
    };

    return (
        <>
            {error ? (
                <>
                    <p>
                        <a href={getShopwareUrl(ShopwareURL.PASSWORD_RECOVERY)}>
                            {t('recovery_invalid_hash')}
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <p>{errorMessage ? errorMessage : ''}</p>
                    <form id="recoveryForm" class="mt-5">
                        <label for="password">{t('new_password')}</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder={t('new_password')}
                            class="block w-full border px-3 py-2"
                        />

                        <label class="mt-5 block" for="c_password">
                            {t('new_password_confirm')}
                        </label>
                        <input
                            id="c_password"
                            type="password"
                            name="c_password"
                            placeholder={t('new_password_confirm')}
                            class="block w-full border px-3 py-2"
                        />

                        <button
                            type="submit"
                            class="mt-2 mt-5 border px-5 py-2"
                            onClick={(e) => recoveryFunction(e)}
                        >
                            {t('send')}
                        </button>
                    </form>
                </>
            )}
        </>
    );
}
