import { useState } from 'preact/hooks';
import DefaultShippingAddress from './DefaultShippingAddress';

import CustomerAddresses from './CustomerAddresses';
import UserAddressCreateModify from '../utils/UserAddressCreateModify';
import { useStore } from '@nanostores/preact';
import { customerStore } from '../utils/shopware-store';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

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
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

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
            class="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 transform overflow-scroll  bg-white p-10"
            style="max-height: 90vh"
        >
            <div class="overflow-scroll">
                <div class="">
                    <DefaultShippingAddress closeOverlay={closeOverlay} />
                </div>

                <div class="flex-column mb-5 mt-5 flex flex-wrap justify-between">
                    <button
                        class="shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleModifyAddress(e)}
                    >
                        {t('modify_address')}
                    </button>
                    <button
                        class="ml-5 mr-5 shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleShowAllAddresses(e)}
                    >
                        {t('select_address')}
                    </button>
                    <button
                        class="shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleShowCreateAddress(e)}
                    >
                        {t('add_new_address')}
                    </button>
                </div>

                {showModifyAddress && (
                    <>
                        <UserAddressCreateModify
                            redirect={false}
                            setFunction={toggleModifyAddress}
                            addressId={customer?.defaultShippingAddress.id}
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
                            addressId={undefined}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
