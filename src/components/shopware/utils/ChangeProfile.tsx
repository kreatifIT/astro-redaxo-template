import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { customerStore } from './shopware-store';
import ChangeProfileData from '../atoms/ChangeProfileData';
import ChangeEmail from '../atoms/ChangeEmail';
import ChangePassword from '../atoms/ChangePassword';

export default function ChangeProfile() {
    const customer = useStore(customerStore);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangEmail, setShowChangEmail] = useState(false);

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
                <h2 class="mb-5 border-b pb-2 font-bold">Persönliche Daten</h2>
                <ChangeProfileData />
            </div>

            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">Zugangsdaten</h2>
                <div class="flex">
                    <div class="flex-auto">
                        <span class="font-bold">E-Mail-Adresse: </span>
                        {customer?.email}
                    </div>
                    <div class="flex-auto">
                        <a
                            class="cursor-pointer"
                            onClick={(e) => toggleEmailForm(e)}
                        >
                            E-Mail-Adresse ändern
                        </a>
                    </div>
                    <div class="flex-auto">
                        <a
                            class="cursor-pointer"
                            onClick={(e) => togglePasswordForm(e)}
                        >
                            Passwort ändern
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
