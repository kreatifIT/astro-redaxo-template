import LineItemSelectQuantity from './LineItemSelectQuantity';
import RemoveLineItem from './RemoveLineItem';

interface Props {
    lineItems: any;
}

export default function LineItemList({ lineItems }: Props) {
    return (
        <>
            {lineItems?.map((lineItem: any) => (
                <div class="flex border-b pt-5 pb-5">
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
                        {lineItem.price.unitPrice.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </div>
                    <div class="w-2/12  px-5">
                        {lineItem.price.totalPrice.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </div>
                    <div class="w-1/12  px-5">
                        <RemoveLineItem lineItem={lineItem} />
                    </div>
                </div>
            ))}
        </>
    );
}
