import { getClangId } from '@helpers/cookies';
import type { ContentType } from '@adapters/redaxo/@types';
import { getForward } from '@adapters/redaxo/layout';
import type { AstroGlobal } from 'astro';
import { setLangRedirectCookie } from './lang-redirect';

export async function performForward(
    contentType: ContentType,
    Astro: AstroGlobal,
): Promise<Response | null> {
    if (contentType.type !== 'forward') return null;

    const forward = await getForward(contentType.elementId, getClangId(Astro));
    if (forward) {
        setLangRedirectCookie(Astro);
        return Astro.redirect(forward.url, forward.status);
    }
    return null;
}