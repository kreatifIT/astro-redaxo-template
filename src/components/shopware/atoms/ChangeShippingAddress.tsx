import { useState } from 'preact/hooks';
import DefaultShippingAddress from './DefaultShippingAddress';

import CustomerAddresses from './CustomerAddresses';
import UserAddressCreateModify from '../utils/UserAddressCreateModify';
import { useStore } from '@nanostores/preact';
import { customerStore } from '../utils/shopware-store';

interface Props {
    setFunction: any | undefined;
    closeOverlay: any | undefined;
}

export default function ChangeShippingAddress({
    setFunction,
    closeOverlay,
}: Props) {
    const customer: any = useStore(customerStore);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [showCreateAddress, setShowCreateAddress] = useState(false);
    const [showModifyAddress, setShowModifyAddress] = useState(false);

    const toggleShowAllAddresses = (e: any) => {
        setShowCreateAddress(false);
        setShowModifyAddress(false);
        setShowAllAddresses(!showAllAddresses);
    };
    const toggleShowCreateAddress = (e: any) => {
        setShowAllAddresses(false);
        setShowModifyAddress(false);
        setShowCreateAddress(!showCreateAddress);
    };

    const toggleModifyAddress = (e: any) => {
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
                    <DefaultShippingAddress closeOverlay={closeOverlay} />
                </div>

                <div class="flex-column mt-5 mb-5 flex flex-wrap justify-between">
                    <button
                        class="shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleModifyAddress(e)}
                    >
                        Adresse bearbeiten
                    </button>
                    <button
                        class="mr-5 ml-5 shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleShowAllAddresses(e)}
                    >
                        Adresse wählen
                    </button>
                    <button
                        class="shrink flex-grow border py-2 px-3"
                        onClick={(e) => toggleShowCreateAddress(e)}
                    >
                        Neue Adresse hinzufügen
                    </button>
                </div>

                {showModifyAddress && (
                    <>
                        <UserAddressCreateModify
                            redirect={false}
                            setFunction={toggleModifyAddress}
                            address={customer?.defaultShippingAddress}
                        />
                    </>
                )}

                {showAllAddresses && (
                    <>
                        <div class="flex-column mt-5 flex flex-wrap">
                            <CustomerAddresses
                                showChangeBilling={false}
                                showChangeShipping={true}
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
