import { useState } from 'preact/hooks';
import DefaultBillingAddress from './DefaultBillingAddress';
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

export default function ChangeBillingAddress({
    setFunction,
    closeOverlay,
}: Props) {
    const customer: any = useStore(customerStore);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [showCreateAddress, setShowCreateAddress] = useState(false);
    const [showModifyAddress, setShowModifyAddress] = useState(false);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

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
            class="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 transform overflow-scroll  bg-white p-10"
            style="max-height: 90vh"
        >
            <div class="overflow-scroll">
                <div class="">
                    <DefaultBillingAddress closeOverlay={closeOverlay} />
                </div>

                <div class="flex-column mb-5 mt-5 flex flex-wrap justify-between">
                    <button
                        class="shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleModifyAddress()}
                    >
                        {t('modify_address')}
                    </button>
                    <button
                        class="ml-5 mr-5 shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleShowAllAddresses()}
                    >
                        {t('select_address')}
                    </button>
                    <button
                        class="shrink flex-grow border px-3 py-2"
                        onClick={(e) => toggleShowCreateAddress()}
                    >
                        {t('add_new_address')}
                    </button>
                </div>

                {showModifyAddress && (
                    <>
                        <UserAddressCreateModify
                            redirect={false}
                            setFunction={toggleModifyAddress}
                            addressId={customer?.defaultBillingAddress.id}
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
                            addressId={undefined}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
