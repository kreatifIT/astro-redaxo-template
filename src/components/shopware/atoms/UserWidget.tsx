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
                    {customer ? (
                        <span>
                            {customer.firstName} {customer.lastName} +
                        </span>
                    ) : (
                        <span>Login +</span>
                    )}
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
