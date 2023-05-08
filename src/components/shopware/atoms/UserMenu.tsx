import { getShopwareUrl } from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import { logout } from '@shopware-pwa/shopware-6-client';
import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    customerStore,
} from '../utils/shopware-store';

export default function UserMenu() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const customer = useStore(customerStore);
    const logoutFunction = async () => {
        let _customLogout = await logout(contextInstance as any);
        window.location.href = '/';
    };

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                Hallo,
                {customer?.firstName}
                {customer?.lastName}
            </h2>
            <div class="">
                <ul>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_OVERVIEW)}>
                            Übersicht
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_PROFILE)}>
                            Profil
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_ADDRESSES)}>
                            Adressen
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_PAYMENTS)}>
                            Zahlungsarten
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_ORDER)}>
                            Bestellungen
                        </a>
                    </li>
                    <li class="border-t">
                        <span
                            class="ml-1 cursor-pointer text-blue-600"
                            onClick={logoutFunction}
                        >
                            Abmleden
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
