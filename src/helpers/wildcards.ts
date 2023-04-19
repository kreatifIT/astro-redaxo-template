import type { ProjectSettings } from '../adapters/kreatif-redaxo-adapter/@types';
import type { AstroGlobal } from 'astro';
import { getClangId } from './properties-management/server-properties';
import { getKreatifWildcards } from '@adapters/kreatif-redaxo-adapter/project-settings';

/**
 * Get a wildcard value based on the current language
 * @param source used to get the current language. Can be a string or an AstroGlobal
 * @param wildcard the wildcard to get the value for
 */
export const t = (source: string | AstroGlobal, wildcard: string): string => {
    const languageId = parseLanguageId(source);
    return WildcardCache.getSprog(wildcard, languageId);
};

/**
 * Get the project settings for the current language
 * @param source used to get the current language. Can be a string (clangId) or an AstroGlobal
 * @returns the project settings for the current language
 */
export const getSettings = (source: string | AstroGlobal): ProjectSettings => {
    const languageId = parseLanguageId(source);
    return WildcardCache.getSettings(languageId);
};

export default class WildcardCache {
    private static sprog: Map<string, Map<string, string>> = new Map();
    private static settings: Map<string, ProjectSettings> = new Map();

    static async prepareCache(languageId: string): Promise<void> {
        const { wildCards, projectSettings } = await getKreatifWildcards(
            languageId,
        );
        wildCards.forEach((w) => {
            if (!this.sprog.has(languageId))
                this.sprog.set(languageId, new Map());
            this.sprog.get(languageId)?.set(w.wildcard, w.replace);
        });
        this.settings.set(languageId, projectSettings);
    }

    static getSprog(wildcard: string, langId: string): string {
        return this.sprog.get(langId)?.get(wildcard) || wildcard;
    }

    static getSettings(langId: string): ProjectSettings {
        return this.settings.get(langId)!;
    }
}

const parseLanguageId = (source: string | AstroGlobal): string => {
    let languageId = '1';
    if (typeof source !== 'string') {
        const state = getClangId(source as AstroGlobal);
        if (state) languageId = state;
    } else {
        languageId = source as string;
    }
    return languageId;
};
