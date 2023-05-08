import type { AstroGlobal } from 'astro';

export const CLANG_ID_COOKIE_NAME = 'clang_id';

export function getClangId(Astro: AstroGlobal): string {
    return Astro.cookies.get(CLANG_ID_COOKIE_NAME).value || '1';
}
