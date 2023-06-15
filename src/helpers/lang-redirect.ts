import type { AstroGlobal } from 'astro';
import type { Clang } from 'redaxo-adapter';

export function performLangRedirect(
    Astro: AstroGlobal,
    currentClang: Clang,
    clangs: Clang[],
): Response | false {
    const hasRedirected = Astro.cookies.get('lang_redirect').boolean();
    Astro.cookies.set('lang_redirect', '1', {
        maxAge: 60 * 60 * 24,
        path: '/',
    });
    if (hasRedirected) return false;

    const browserLangCodes = Astro.request.headers
        .get('accept-language')
        ?.split(',')
        .map((lang) => lang.split(';')[0].trim());

    if (!browserLangCodes) return false;

    const browserLangCode = browserLangCodes
        .map((lang) => lang.split('-')[0].toLowerCase())
        .find((lang) =>
            clangs.some((clang) => clang.code.toLowerCase() === lang),
        );
    if (!browserLangCode) return false;

    const browserClang = clangs.find(
        (clang) => clang.code.toLowerCase() === browserLangCode.toLowerCase(),
    );
    if (!browserClang) return false;

    if (browserClang.id !== currentClang.id) {
        return Astro.redirect(browserClang.url, 302);
    }
    return false;
}
