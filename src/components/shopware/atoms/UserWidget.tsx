import { useState } from 'preact/hooks';
import { getShopwareUrl } from '@components/shopware/helpers/client';
import UserMenu from './UserMenu';
import LoginForm from './LoginForm';
import { ShopwareURL } from '../helpers/url';
import { useStore } from '@nanostores/preact';
import { customerStore } from '../utils/shopware-store';

export default function UserWidget() {
    const [showLogin, setShowLogin] = useState(false);
    const customer = useStore(customerStore);
    const showLoginFunction = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <div class="relative ml-10 mr-10">
                <div class="cursor" onClick={showLoginFunction}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="h-6 w-6"
                    >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                </div>
                <div
                    class={
                        showLogin
                            ? 'absolute right-0 border bg-white p-2'
                            : 'absolute hidden'
                    }
                >
                    {customer ? (
                        <>
                            <UserMenu />
                        </>
                    ) : (
                        <div class="">
                            <LoginForm />
                            <p>
                                Sie haben noch keinen Account?
                                <br />
                                <a
                                    href={getShopwareUrl(
                                        ShopwareURL.REGISTRATION,
                                    )}
                                    class="cursor-pointer text-blue-600"
                                >
                                    Hier Registrieren
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
