import { formatPrice } from '../helpers/client';
import LineItemSelectQuantity from './LineItemSelectQuantity';
import RemoveLineItem from './RemoveLineItem';

interface Props {
    lineItems: any;
}

export default function LineItemList({ lineItems }: Props) {
    return (
        <>
            {lineItems?.map((lineItem: any) => (
                <div class="flex border-b pb-5 pt-5">
                    <div class="w-5/12 px-5">
                        <div class="flex">
                            {lineItem?.cover?.url && (
                                <img
                                    src={lineItem?.cover?.url}
                                    alt={lineItem?.cover?.alt}
                                    class="mr-5 w-[50px]"
                                />
                            )}
                            {lineItem.label}
                        </div>
                    </div>
                    <div class="w-2/12 px-5">
                        {lineItem.type === 'product' && (
                            <LineItemSelectQuantity lineItem={lineItem} />
                        )}
                    </div>
                    <div class="w-2/12  px-5">
                        {formatPrice(lineItem.price.unitPrice)}
                    </div>
                    <div class="w-2/12  px-5">
                        {formatPrice(lineItem.price.totalPrice)}
                    </div>
                    <div class="w-1/12  px-5">
                        <RemoveLineItem lineItem={lineItem} />
                    </div>
                </div>
            ))}
        </>
    );
}
