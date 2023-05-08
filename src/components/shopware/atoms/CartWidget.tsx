import { useStore } from '@nanostores/preact';
import {
    cartStore,
    customerStore,
    showOffcanvasStore,
} from '../utils/shopware-store';
import { useEffect, useState } from 'preact/hooks';

export default function CartWidget() {
    const [cartCount, setCartCount] = useState(0);
    const cart = useStore(cartStore);
    const showOffcanvas = useStore(showOffcanvasStore);
    const customer = useStore(customerStore);

    useEffect(() => {
        if (cart && cart.lineItems) {
            setCartCount(cart?.lineItems?.length);
        } else {
            setCartCount(0);
        }
    }, [cart]);

    useEffect(() => {}, [customer]);

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
                    Warenkorb
                </span>
                <span className="cart__count absoulte -top-0.5 -right-0.5 rounded-full bg-green-800 px-2 py-1 text-white">
                    {cartCount}
                </span>
            </p>
        </div>
    );
}
