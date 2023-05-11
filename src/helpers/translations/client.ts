import { useEffect, useState } from 'preact/hooks';
import TranslationCache from './cache';

export default function useTranslations(langCode: string, namespace: string) {
    const [translations, setTranslations] = useState<Map<string, string>>(
        new Map(),
    );

    useEffect(() => {
        TranslationCache.get(langCode, namespace).then((translations) => {
            setTranslations(translations);
        });
    }, [langCode, namespace]);

    return (key: string) => translations.get(key) ?? key;
}
