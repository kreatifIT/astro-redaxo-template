import useWildcards from "@adapters/redaxo/useWildcards";
import type { FormError } from "@helpers/@types";
import { parseFormErrors, performRecaptcha } from "@helpers/form";
import { useRef, useState } from "preact/hooks";
import './Form.scss';
import Errors from "./partials/Errors";
import Success from "./partials/Success";
import { GraphQLResponse, RedaxoAdapter } from "redaxo-adapter";

interface FormDataBase {
    captcha: string;
}

interface Props<T> {
    className: string;
    onSubmit: (data: T) => Promise<GraphQLResponse>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    children: any;
    wildcards?: Map<string, string>;
}

// todo: onsubmit: implement sending of mail

export default function FormWrapper<T extends FormDataBase>(
    { children, className, onSubmit, loading, setLoading, wildcards: _wildcards }: Props<T>,
) {

    const scrollMarginClasses = 'scroll-mt-28 xl:scroll-mt-36';
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
    const formRef = useRef<HTMLFormElement>(null);
    const scrollFormInit = formRef.current?.scrollIntoView({ behavior: 'smooth' });
    const [success, setSuccess] = useState(false);
    const _onSubmit = (e: any) => {
        RedaxoAdapter.init(import.meta.env.PUBLIC_REDAXO_ENDPOINT, import.meta.env.PUBLIC_REDAXO_ROOT)
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let santizedData: Record<string, any | null> = {};
        Object.keys(data).forEach((key) => {
            // @ts-ignore
            santizedData[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
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
            ).then(({ data, errors }: any) => {
                if (errors && errors.length > 0) {
                    const parsedErrors = parseFormErrors(errors);
                    if (parsedErrors.length === 0) {
                        parsedErrors.push({
                            field: 'general',
                            wildcard: 'label.general_error',
                        });
                    }
                    setErrors(parsedErrors);
                    setLoading(false);
                    scrollFormInit;
                } else if (data.success) {
                    setErrors([]);
                    setSuccess(true);
                    setLoading(false);
                    scrollFormInit;
                }
            }).catch((error) => {
                setErrors(parseFormErrors(error));
                setLoading(false);
                scrollFormInit;
            });
        }).catch(() => {
            setErrors([
                {
                    field: 'captcha',
                    wildcard: 'label.error_recaptcha_not_successful',
                }
            ]);
            setLoading(false);
            scrollFormInit;
        });

    };

    return (
        <form class={[scrollMarginClasses, className].join(' ')} onSubmit={_onSubmit} noValidate ref={formRef}>
            <Errors errors={errors} wildcards={new Map([
                ..._wildcards?.entries() ?? [],
                ...wildcards?.entries() ?? []
            ])} />
            <Success success={success} wildcards={wildcards} />
            {children}
        </form>
    );
}
