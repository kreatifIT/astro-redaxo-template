interface Props {
    minPurchase: number;
    calculatedMaxPurchase: number;
    purchaseSteps: number;
}

export function Options({ number }: any) {
    return <option value={number}>{number}</option>;
}

export default function ProductSelectQuantity({
    minPurchase,
    calculatedMaxPurchase,
    purchaseSteps,
}: Props) {
    let options: any = [];

    for (let i = minPurchase; i <= calculatedMaxPurchase; i += purchaseSteps) {
        options.push(<Options key={i} number={i} />);
    }

    return (
        <>
            <select
                class="mr-5 h-10 w-full rounded border"
                type="number"
                data-product-amount
            >
                {options}
            </select>
        </>
    );
}
