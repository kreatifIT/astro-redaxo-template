import { useStore } from '@nanostores/preact';
import { cartStore, showOffcanvasStore } from '../utils/shopware-store';
import { useEffect, useState } from 'preact/hooks';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function CartWidget() {
    const [cartCount, setCartCount] = useState(0);
    const cart = useStore(cartStore);
    const showOffcanvas = useStore(showOffcanvasStore);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    useEffect(() => {
        if (cart && cart.lineItems) {
            setCartCount(cart?.lineItems?.length);
        } else {
            setCartCount(0);
        }
    }, [cart]);

    const toggleOffcanvas = () => {
        showOffcanvasStore.set(!showOffcanvas);
    };

    return (
        <div class="sw-wrap relativ ml-5 mr-5 flex">
            <p>
                <span
                    title="Warenkorb"
                    onClick={(e) => toggleOffcanvas()}
                    class="cursor-pointer"
                >
                    {t('cart')}
                </span>
                <span className="cart__count absoulte -right-0.5 -top-0.5 ml-1 rounded-full bg-green-800 px-2 py-1 text-white">
                    {cartCount}
                </span>
            </p>
        </div>
    );
}