import { useState } from 'preact/hooks';
import DefaultBillingAddress from './DefaultBillingAddress';
import CustomerAddresses from './CustomerAddresses';
import UserAddressCreateModify from '../utils/UserAddressCreateModify';
import { useStore } from '@nanostores/preact';
import { customerStore } from '../utils/shopware-store';

interface Props {
    setFunction: any | undefined;
    closeOverlay: any | undefined;
}

export default function ChangeBillingAddress({
    setFunction,
    closeOverlay,
}: Props) {
    const customer: any = useStore(customerStore);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [showCreateAddress, setShowCreateAddress] = useState(false);
    const [showModifyAddress, setShowModifyAddress] = useState(false);

    const toggleShowAllAddresses = () => {
        setShowCreateAddress(false);
        setShowModifyAddress(false);
        setShowAllAddresses(!showAllAddresses);
    };
    const toggleShowCreateAddress = () => {
        setShowAllAddresses(false);
        setShowModifyAddress(false);
        setShowCreateAddress(!showCreateAddress);
    };

    const toggleModifyAddress = () => {
        setShowAllAddresses(false);
        setShowCreateAddress(false);
        setShowModifyAddress(!showModifyAddress);
    };

    return (
        <div
            class="fixed top-1/2 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 transform overflow-scroll  bg-white p-10"
            style="max-height: 90vh"
        >
            <div class="overflow-scroll">
                <div class="">
                    <DefaultBillingAddress closeOverlay={closeOverlay} />
                </div>

                <div class="flex-column mt-5 mb-5 flex flex-wrap justify-between">
                    <button
                        class="shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleModifyAddress()}
                    >
                        Adresse bearbeiten
                    </button>
                    <button
                        class="mr-5 ml-5 shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleShowAllAddresses()}
                    >
                        Adresse wählen
                    </button>
                    <button
                        class="shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleShowCreateAddress()}
                    >
                        Neue Adresse hinzufügen
                    </button>
                </div>

                {showModifyAddress && (
                    <>
                        <UserAddressCreateModify
                            redirect={false}
                            setFunction={toggleModifyAddress}
                            address={customer?.defaultBillingAddress}
                        />
                    </>
                )}

                {showAllAddresses && (
                    <>
                        <div class="flex-column mt-5 flex flex-wrap">
                            <CustomerAddresses
                                showChangeBilling={true}
                                showChangeShipping={false}
                                showButtons={false}
                                setFunction={setFunction}
                            />
                        </div>
                    </>
                )}
                {showCreateAddress && (
                    <>
                        <UserAddressCreateModify
                            redirect={false}
                            setFunction={toggleShowCreateAddress}
                            address={undefined}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
