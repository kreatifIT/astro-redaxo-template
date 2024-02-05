import { useRef, useState } from 'preact/hooks';
import '@kreatif/starter/components/utils/form/Form.scss';
import Errors from '@kreatif/starter/components/utils/form/partials/Errors.tsx';
import Success from '@kreatif/starter/components/utils/form/partials/Success.tsx';
import type { GraphQLResponse } from 'redaxo-adapter';
import useWildcards from '@kreatif/starter/hooks/useWildcards';
import type { FormError } from '@kreatif/starter/utils/forms.ts';
import { parseFormErrors, performRecaptcha } from '@kreatif/starter/utils/forms.ts';

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

export default function FormWrapper<T extends FormDataBase>({
    children,
    className,
    onSubmit,
    loading,
    setLoading,
    wildcards: _wildcards,
}: Props<T>) {
    const scrollMarginClasses = 'scroll-mt-28 xl:scroll-mt-36';
    const { wildcards } = useWildcards([
        'label.error_field_empty',
        'label.error_email_not_valid',
        'label.submit_success',
        'label.error_recaptcha_not_successful',
        'label.error_privacy_not_accepted',
    ]);
    const [errors, setErrors] = useState<FormError[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const scrollFormInit = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const [success, setSuccess] = useState(false);
    const _onSubmit = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let santizedData: Record<string, any | null> = {};
        Object.keys(data).forEach((key) => {
            // @ts-ignore
            santizedData[key] =
                // @ts-ignore
                typeof data[key] === 'string' ? data[key].trim() : data[key];
        });
        // @ts-ignore
        const siteKey = window.recaptchaSiteKey;
        if (!siteKey) {
            throw new Error('No recaptcha site key found');
        }

        performRecaptcha(siteKey)
            .then((recaptchaToken) => {
                onSubmit({
                    ...santizedData,
                    captcha: recaptchaToken,
                } as T)
                    .then(({ data, errors }: any) => {
                        console.log(data);
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
                            scrollFormInit();
                        } else if (data.success) {
                            setErrors([]);
                            setSuccess(true);
                            setLoading(false);
                            scrollFormInit();
                        } else {
                            for (var propName in data) {
                                if (
                                    data[propName].hasOwnProperty('success') &&
                                    data[propName]['success'] == true
                                ) {
                                    setErrors([]);
                                    setSuccess(true);
                                    setLoading(false);
                                    scrollFormInit();
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        setErrors(parseFormErrors(error));
                        setLoading(false);
                        scrollFormInit();
                        console.log('other err or');
                    });
            })
            .catch(() => {
                setErrors([
                    {
                        field: 'captcha',
                        wildcard: 'label.error_recaptcha_not_successful',
                    },
                ]);
                setLoading(false);
                scrollFormInit();
                console.log('piter catch');
            });
    };

    return (
        <form
            class={[
                scrollMarginClasses,
                className,
                loading ? 'loading' : '',
            ].join(' ')}
            onSubmit={_onSubmit}
            noValidate
            ref={formRef}
        >
            <Errors
                errors={errors}
                wildcards={
                    new Map([
                        ...(_wildcards?.entries() ?? []),
                        ...(wildcards?.entries() ?? []),
                    ])
                }
            />
            <Success success={success} wildcards={wildcards} />
            {children}
        </form>
    );
}
