import type { AstroGlobal } from 'astro';
import { Article, ArticleSlice, RedaxoAdapter } from 'redaxo-adapter';
import { getClangId } from './cookies';

export const REDAXO_JWT_COOKIE_NAME = 'redaxo_jwt';

export function isRedaxoLoggedIn(Astro: AstroGlobal): boolean {
    return !!Astro.cookies.get(REDAXO_JWT_COOKIE_NAME)?.value;
}

export function getSliceEditLink(
    Astro: AstroGlobal,
    footerModule: boolean,
    slice: ArticleSlice,
    article?: Article,
): string | null {
    if (!isRedaxoLoggedIn(Astro) || !article) return null;
    const clangId = getClangId(Astro);
    const page = footerModule ? 'special_content/edit' : 'content/edit';
    return `${RedaxoAdapter.getRedaxoRoot()}/redaxo/index.php?page=${page}&article_id=${
        article.id
    }&slice_id=${slice.id}&clang=${clangId}&ctype=1&function=edit#slice${
        slice.id
    }`;
}
