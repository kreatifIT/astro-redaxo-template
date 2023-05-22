import { useStore } from '@nanostores/preact';
import { ShopwareApiInstanceStore, cartStore } from '../utils/shopware-store';
import { removeCartItem } from '@shopware-pwa/shopware-6-client';
import { toast } from 'react-toastify';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

interface Props {
    lineItem: any;
}

export default function RemoveLineItem({ lineItem }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const removeLineItem = async (lineItemId: string) => {
        const removeLineItems = await removeCartItem(
            lineItemId,
            contextInstance as any,
        );

        toast.success(t('product_removed_from_cart'));

        cartStore.set(removeLineItems);
    };

    return (
        <>
            <button onClick={() => removeLineItem(lineItem.id)}>X</button>
        </>
    );
}
