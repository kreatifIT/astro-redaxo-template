import { useStore } from '@nanostores/preact';
import { changeCartItemQuantity } from '@shopware-pwa/shopware-6-client';
import { ShopwareApiInstanceStore, cartStore } from '../utils/shopware-store';

interface Props {
    lineItem: any;
}

export function Options({ number, quantity }: any) {
    return (
        <option value={number} selected={quantity === number ? true : false}>
            {number}
        </option>
    );
}

export default function LineItemSelectQuantity({ lineItem }: Props) {
    const contextInstance = useStore(ShopwareApiInstanceStore);
    let options: any = [];
    for (
        let i = lineItem.quantityInformation.minPurchase;
        i <= lineItem.quantityInformation.maxPurchase;
        i += lineItem.quantityInformation.purchaseSteps
    ) {
        options.push(
            <Options key={i} number={i} quantity={lineItem.quantity} />,
        );
    }
    const changeLineItemQuantity = async (e: any) => {
        const _response = await changeCartItemQuantity(
            lineItem.id,
            parseInt(e.target.value),
            contextInstance as any,
        );
        cartStore.set(_response);
    };

    return (
        <>
            <select
                class="mr-5 h-10 w-full rounded border"
                type="number"
                data-line-item-id={lineItem.id}
                onChange={(e) => changeLineItemQuantity(e)}
            >
                {options}
            </select>
        </>
    );
}
