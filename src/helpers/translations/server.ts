import TranslationCache from './cache';

export default async function getTranslations(
    langCode: string,
    namespace: string,
) {
    const translations = await TranslationCache.get(langCode, namespace);
    return (key: string) => translations.get(key);
}
