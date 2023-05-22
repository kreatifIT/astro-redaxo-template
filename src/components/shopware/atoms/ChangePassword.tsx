import { useStore } from '@nanostores/preact';
import {
    CustomerUpdatePasswordParam,
    getSessionContext,
    updatePassword,
} from '@shopware-pwa/shopware-6-client';
import {
    ShopwareApiInstanceStore,
    contextStore,
    customerStore,
} from '../utils/shopware-store';
import { getClangCodeFromCookie } from '../helpers/client';
import useTranslations from '@helpers/translations/client';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const contextInstance = useStore(ShopwareApiInstanceStore);

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const afterPasswordChanged = async () => {
        const context = await getSessionContext(contextInstance as any);
        contextStore.set(context);
        customerStore.set(context.customer);
    };

    const changePassword = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPasword = formData.get('new_password');
        const confirmNewPasword = formData.get('confirm_password');
        const oldPasword = formData.get('old_password');

        if (newPasword === '' || newPasword != confirmNewPasword) {
            toast.error(t('error_password_not_match'));
        } else if (oldPasword === '') {
            toast.error(t('label_add_password'));
        } else {
            await updatePassword(
                {
                    password: oldPasword,
                    newPassword: newPasword,
                    newPasswordConfirm: confirmNewPasword,
                } as CustomerUpdatePasswordParam,
                contextInstance as any,
            )
                .then((e: any) => {
                    toast.success(t('password_successfully_updated'));
                    afterPasswordChanged();
                })
                .catch((e: any) => {
                    e.messages.map((message: any) => {
                        if (message.code.split('::')[1]) {
                            let key = message.code.split('::')[1].toLowerCase();
                            toast.error(t(key));
                        }
                    });
                });
        }

        return false;
    };

    return (
        <>
            <div class="mt-10">
                <h2 class="mb-5 border-b pb-2 font-bold">{t('password')}</h2>

                <form method="post" onSubmit={(e) => changePassword(e)}>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="new_password">
                                {t('new_password')}
                                {t('mandatory')}
                            </label>
                            <input
                                type="password"
                                class="block w-full border"
                                name="new_password"
                                id="new_password"
                            />
                        </div>
                        <div class="w-[50%] pl-5">
                            <label for="confirm_password">
                                {t('new_password_confirm')}
                                {t('mandatory')}
                            </label>
                            <input
                                id="confirm_password"
                                class="block w-full border"
                                type="password"
                                name="confirm_password"
                            />
                        </div>
                    </div>
                    <div class="mb-5 mt-5 w-[100%]">
                        <p>{t('label_add_password')}</p>
                    </div>
                    <div class="flex">
                        <div class="w-[50%] pr-5">
                            <label for="old_password">
                                {t('current_password')}
                                {t('mandatory')}
                            </label>
                            <input
                                type="password"
                                class="block w-full border"
                                name="old_password"
                                id="old_password"
                            />
                        </div>
                    </div>
                    <div class="mb-5 mt-5 w-[100%]">
                        <p>{t('label_mandatory_fields')}</p>
                        <button
                            type="submit"
                            class="mt-5 inline-block border p-2"
                        >
                            {t('save_adjustments')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
