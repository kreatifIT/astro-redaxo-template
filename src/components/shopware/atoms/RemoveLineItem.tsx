import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore, cartStore } from '../utils/shopware-store';
import { removeCartItem } from '@shopware-pwa/shopware-6-client';

interface Props {
    lineItem: any;
}

export default function RemoveLineItem({ lineItem }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const removeLineItem = async (lineItemId: string) => {
        const removeLineItems = await removeCartItem(
            lineItemId,
            contextInstance as any,
        );
        cartStore.set(removeLineItems);
    };

    return (
        <>
            <button onClick={() => removeLineItem(lineItem.id)}>X</button>
        </>
    );
}
