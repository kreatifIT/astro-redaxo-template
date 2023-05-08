import { useState } from 'preact/hooks';
import { getShopwareUrl } from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import {
    ShopwareApiInstance,
    confirmPasswordReset,
} from '@shopware-pwa/shopware-6-client';
import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore } from './shopware-store';

interface Props {
    pwHash: string;
}

export default function ResetPassword({ pwHash }: Props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const contextInstance: ShopwareApiInstance = useStore(
        ShopwareApiInstanceStore,
    );

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

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
                            setErrorMessage(
                                'Bitte kontrollieren Sie ihre eingabe und versuchen Sie es erneut.',
                            );
                        }
                    });
            } else {
                setErrorMessage('Die Passwörter stimmen nicht überein.');
            }
        } else {
            setErrorMessage('Bitte geben Sie ein gültiges Passwort an.');
        }
        return false;
    };

    return (
        <>
            {error ? (
                <>
                    <p>
                        Anfragezeit überschritten. Bitte fragen Sie{' '}
                        <a href={getShopwareUrl(ShopwareURL.PASSWORD_RECOVERY)}>
                            erneut an
                        </a>
                        .
                    </p>
                </>
            ) : (
                <>
                    <p>{errorMessage ? errorMessage : ''}</p>
                    <form id="recoveryForm" class="mt-5">
                        <label for="password">Neus Passwort</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Neus Passwort"
                            class="block w-full border py-2 px-3"
                        />

                        <label class="mt-5 block" for="c_password">
                            Passwort wiederholen
                        </label>
                        <input
                            id="c_password"
                            type="password"
                            name="c_password"
                            placeholder="Passwort wiederholen"
                            class="block w-full border py-2 px-3"
                        />

                        <button
                            type="submit"
                            class="mt-2 mt-5 border px-5 py-2"
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
