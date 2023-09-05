import type {FormError} from './@types';

export const performRecaptcha = async (siteKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        if (!window.grecaptcha) {
            reject('Recaptcha not loaded');
        }
        // @ts-ignore
        window.grecaptcha.ready(() => {
            // @ts-ignore
            window.grecaptcha
                .execute(siteKey, {action: 'submit'})
                .then((token: string) => {
                    resolve(token);
                }).catch((error: any) => {
                reject(error);
            });
        });
    });
};

export const parseFormErrors = (errors: any): FormError[] => {
    if (!errors) {
        return [];
    }
    const errorString = errors[0].message;
    if (errorString) {
        try {
            return JSON.parse(errorString);
        } catch (e) {
            return [];
        }
    }
    return [];
};
