import { useStore } from '@nanostores/preact';
import { cartStore, customerStore } from '../utils/shopware-store';

interface Props {
    closeOverlay: any | undefined;
}

export default function DefaultBillingAddress({ closeOverlay }: Props) {
    const customer = useStore(customerStore);

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                Standard-Rechnugnsadresse
                {closeOverlay && (
                    <button
                        class="float-right"
                        onClick={(e) => closeOverlay(e)}
                    >
                        X
                    </button>
                )}
            </h2>
            <div>
                <p>
                    {customer?.defaultBillingAddress?.firstName + ' '}
                    {customer?.defaultBillingAddress?.lastName}
                </p>
                <p>{customer?.defaultBillingAddress?.street}</p>
                <p>
                    {customer?.defaultBillingAddress.zipcode + ' '}
                    {customer?.defaultBillingAddress.city}
                </p>
                <p>{customer?.defaultBillingAddress.country.translated.name}</p>
            </div>
        </>
    );
}
