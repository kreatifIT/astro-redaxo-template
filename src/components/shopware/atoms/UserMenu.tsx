import {
    getClangCodeFromCookie,
    getShopwareUrl,
} from '@components/shopware/helpers/client';
import { ShopwareURL } from '../helpers/url';
import { logout } from '@shopware-pwa/shopware-6-client';
import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstanceStore,
    customerStore,
} from '../utils/shopware-store';
import useTranslations from '@helpers/translations/client';

export default function UserMenu() {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const customer: any = useStore(customerStore);
    const logoutFunction = async () => {
        let _customLogout = await logout(contextInstance as any);
        window.location.href = '/';
    };
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                {t('greeting')},{customer?.firstName} {customer?.lastName}
            </h2>
            <div class="">
                <ul>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_OVERVIEW)}>
                            {t('overview')}
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_PROFILE)}>
                            {t('profile')}
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_ADDRESSES)}>
                            {t('addresses')}
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_PAYMENTS)}>
                            {t('payment_methods')}
                        </a>
                    </li>
                    <li>
                        <a href={getShopwareUrl(ShopwareURL.USER_ORDER)}>
                            {t('orders')}
                        </a>
                    </li>
                    <li class="border-t">
                        <span
                            class="ml-1 cursor-pointer text-blue-600"
                            onClick={logoutFunction}
                        >
                            {t('logout')}
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
