import type { AstroGlobal } from 'astro';

export const CLANG_ID_COOKIE_NAME = 'clang_id';

export const parseCookieData = (key: string) => {
    const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(key));
    if (!cookie) return null;
    const value = cookie.split('=')[1];
    return value;
};

export function getClangId(Astro?: AstroGlobal): string {
    if (Astro) return Astro.cookies.get(CLANG_ID_COOKIE_NAME)?.value || '1';
    if (typeof window === 'undefined')
        throw new Error(
            'Please provide AstroGlobal or run this function on client side',
        );
    return parseCookieData(CLANG_ID_COOKIE_NAME) || '';
}
