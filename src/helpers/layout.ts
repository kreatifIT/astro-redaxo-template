import { CLANG_ID_COOKIE_NAME, REDAXO_JWT_COOKIE_NAME } from './cookies';
import { getInitialData } from '@adapters/redaxo/layout';
import WildcardCache from './wildcards';
import { Clang, RedaxoAdapter } from 'redaxo-adapter';
import type { AstroGlobal } from 'astro';

export async function getLayoutData(
    Astro: AstroGlobal,
    path: string,
    navigationDepth: number,
) {
    const redaxoJwt =
        Astro.url.searchParams.get('auth') ??
        Astro.cookies.get(REDAXO_JWT_COOKIE_NAME)?.value;
    RedaxoAdapter.init(
        import.meta.env.PUBLIC_REDAXO_ENDPOINT,
        import.meta.env.PUBLIC_REDAXO_ROOT,
        redaxoJwt ?? import.meta.env.REDAXO_SHARED_SECRET,
    );
    const {
        projectSettings,
        wildCards,
        footerArticle,
        siteStartArticle,
        clangs,
        navigation,
        article,
        contentType,
        redaxoLoggedIn,
    } = await getInitialData(path, navigationDepth);
    const currentClang = contentType.clangs.find((c) => c.active) as Clang;
    WildcardCache.prepareCache(wildCards, projectSettings, currentClang.id);
    Astro.cookies.set(CLANG_ID_COOKIE_NAME, currentClang.id);
    if (redaxoLoggedIn) {
        Astro.cookies.set(REDAXO_JWT_COOKIE_NAME, redaxoJwt || '');
    } else {
        Astro.cookies.delete(REDAXO_JWT_COOKIE_NAME);
    }
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
