import { buildLogoUrl, mergeUrl } from '@kreatif/starter/utils/url';

export const baseUrl = import.meta.env.FRONTEND_ROOT;
export function getLogoUrl() {
    return buildLogoUrl(baseUrl);
}

export function getFrontendUrl(url: string) {
    return mergeUrl(baseUrl, url);
}
