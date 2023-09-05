import useWildcards from "@adapters/redaxo/useWildcards";
import type { FormError } from "@helpers/@types";
import { parseFormErrors, performRecaptcha } from "@helpers/form";
import { useState } from "preact/hooks";
import './Form.scss';
import Errors from "./partials/Errors";
import Success from "./partials/Success";

interface FormDataBase {
    captcha: string;
}
interface Props<T> {
    className: string;
    onSubmit: (data: T) => Promise<void>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    children: any;
}

// todo: onsubmit: implement sending of mail

export default function FormWrapper<T extends FormDataBase>(
    { children, className, onSubmit, loading, setLoading }: Props<T>,
) {
    const { wildcards } = useWildcards([
        'label.error_field_empty',
        'label.error_email_not_valid',
        'label.submit_success',
        'label.error_recaptcha_not_successful',
        'label.error_privacy_not_accepted',
    ]);
    const [errors, setErrors] = useState<FormError[]>([
        // these are fake error messages for testing purposes
        // {
        //     field: 'recaptchaToken',
        //     wildcard: 'label.error_recaptcha_not_successful',
        // },
        // {
        //     field: 'recaptchaToken',
        //     wildcard: 'label.error_recaptcha_not_successful',
        // },
    ]);
    const [success, setSuccess] = useState(false);
    const _onSubmit = (e: any) => new Promise<void>((resolve, reject) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let santizedData: Record<string, string | null> = {};
        Object.keys(data).forEach((key) => {
            santizedData[key] = data[key].toString().trim();
        });
        // @ts-ignore
        const siteKey = window.recaptchaSiteKey;
        if (!siteKey) {
            throw new Error('No recaptcha site key found');
        }
        performRecaptcha(siteKey).then((recaptchaToken) => {
            onSubmit(
                {
                    ...santizedData,
                    captcha: recaptchaToken,
                } as T,
            ).then(() => {
                setSuccess(true);
                setLoading(false);
                resolve();
            }).catch((error) => {
                setErrors(parseFormErrors(error));
                setLoading(false);
                reject();
            });
        });
    });

    return (
        <form class={className} onSubmit={_onSubmit} noValidate>
            <Errors errors={errors} wildcards={wildcards} />
            <Success success={success} wildcards={wildcards} />
            {children}
        </form>
    );
}
