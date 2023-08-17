import type { PopupUserInformation } from '@adapters/redaxo/@types';
import type { AstroGlobal } from 'astro';
import { getClangId } from './cookies';
import { getPopups } from '@adapters/redaxo/popups';

export async function getPopupData(Astro: AstroGlobal, articleId?: string) {
    const popupCookieData: PopupUserInformation[] = Astro.cookies.has(
        'popup_data',
    )
        ? Astro.cookies.get('popup_data')?.json()
        : [{}];

    const clangId = getClangId(Astro);
    const popups = await getPopups(
        popupCookieData.map((d) => ({
            ...d,
            currentArticleId: articleId ?? '1',
        })),
        clangId,
    );

    Astro.cookies.set(
        'popup_data',
        JSON.stringify(popups.map((p) => p.newData)),
    );
    return popups;
}
