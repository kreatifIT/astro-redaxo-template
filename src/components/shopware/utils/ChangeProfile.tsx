import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { customerStore } from './shopware-store';
import ChangeProfileData from '../atoms/ChangeProfileData';
import ChangeEmail from '../atoms/ChangeEmail';
import ChangePassword from '../atoms/ChangePassword';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';

export default function ChangeProfile() {
    const customer: any = useStore(customerStore);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangEmail, setShowChangEmail] = useState(false);
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const toggleEmailForm = (e: any) => {
        setShowChangEmail(!showChangEmail);
        setShowChangePassword(false);
    };

    const togglePasswordForm = (e: any) => {
        setShowChangEmail(false);
        setShowChangePassword(!showChangePassword);
    };

    return (
        <>
            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">
                    {t('personal_data')}
                </h2>
                <ChangeProfileData />
            </div>

            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">{t('credentials')}</h2>
                <div class="flex">
                    <div class="flex-auto">
                        <span class="font-bold">{t('email_address')}: </span>
                        {customer?.email}
                    </div>
                    <div class="flex-auto">
                        <a
                            class="cursor-pointer"
                            onClick={(e) => toggleEmailForm(e)}
                        >
                            {t('change_email_address')}
                        </a>
                    </div>
                    <div class="flex-auto">
                        <a
                            class="cursor-pointer"
                            onClick={(e) => togglePasswordForm(e)}
                        >
                            {t('change_password')}
                        </a>
                    </div>
                </div>

                {showChangEmail && (
                    <>
                        <ChangeEmail />
                    </>
                )}

                {showChangePassword && (
                    <>
                        <ChangePassword />
                    </>
                )}
            </div>
        </>
    );
}
