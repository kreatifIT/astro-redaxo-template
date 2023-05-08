import { useStore } from '@nanostores/preact';
import { customerStore } from '../utils/shopware-store';

interface Props {
    closeOverlay: any | undefined;
}

export default function DefaultShippingAddress({ closeOverlay }: Props) {
    const customer: any = useStore(customerStore);

    return (
        <>
            <h2 class="mb-5 border-b pb-2 font-bold">
                Standard-Lieferadresse
                {closeOverlay && (
                    <button
                        class="float-right"
                        onClick={(e) => closeOverlay(e)}
                    >
                        X
                    </button>
                )}
            </h2>
            {customer && (
                <>
                    <div>
                        <p>
                            {customer?.defaultShippingAddress.firstName + ' '}
                            {customer?.defaultShippingAddress.lastName}
                        </p>
                        <p>{customer?.defaultShippingAddress.street}</p>
                        <p>
                            {customer?.defaultShippingAddress.zipcode + ' '}
                            {customer?.defaultShippingAddress.city}
                        </p>
                        <p>
                            {
                                customer?.defaultShippingAddress.country
                                    .translated.name
                            }
                        </p>
                    </div>
                </>
            )}
        </>
    );
}
