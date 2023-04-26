import { getInitialData } from '@adapters/kreatif-redaxo-adapter/layout';
import WildcardCache from './wildcards';
import type { Clang } from '@adapters/redaxo/@types';

export async function getLayoutData(path: string, navigationDepth: number) {
    const {
        projectSettings,
        wildCards,
        footerArticle,
        siteStartArticle,
        clangs,
        navigation,
        article,
        contentType,
    } = await getInitialData(path, navigationDepth);
    const currentClang = contentType.clangs.find((c) => c.active) as Clang;
    WildcardCache.prepareCache(wildCards, projectSettings, currentClang.id);
    return {
        article,
        footerArticle,
        siteStartArticle,
        navigation,
        clangs,
        contentType,
        currentClang,
    };
}
