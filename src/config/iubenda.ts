import type { AstroGlobal } from 'astro';
import type { Clang } from 'redaxo-adapter';
import { t } from '../../../@kreatif/starter/src/helpers/wildcards';
import { getClangId } from './cookies';

const BANNER = `
<div class="iubenda-cs-container">
    <div class="iubenda-cs-content">
        <div class="iubenda-cs-rationale">
            <div class="iubenda-banner-content iubenda-custom-content" role="document" tabindex="0"> %{banner_content}</div>
            <div class="iubenda-cs-opt-group">
                <div class="iubenda-cs-opt-group-custom">
                <button aria-pressed="false" class="iubenda-cs-customize-btn" role="button" tabindex="0">
                ###label.cookie_banner_customize###
            </button>
                </div>
                <div class="iubenda-cs-opt-group-consent">
                    <button aria-pressed="false" class="iubenda-cs-reject-btn iubenda-cs-btn-primary" role="button" tabindex="0">
                        ###label.cookie_banner_reject###
                    </button>
                    <button aria-pressed="false" class="iubenda-cs-accept-btn iubenda-cs-btn-primary" role="button" tabindex="0">
                        ###label.cookie_banner_accept###
                    </button>
                </div>
            </div>
            <cookieBannerLanguageSwitch/>
        </div>
    </div>
</div>
`;

const LANG_SWITCHER = `
<div class="cookieBannerLanguageSwitch">
    <ToggleButton />
    <div class="cookieBannerLanguageMenu">
        <LanguageAnchors/>
    </div>
</div>

`;

const TOGGLE_BUTTON = `
<div class="cookieBannerLanguageToggler">
    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="globe" class="svg-inline--fa fa-globe fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm193.2 152h-82.5c-9-44.4-24.1-82.2-43.2-109.1 55 18.2 100.2 57.9 125.7 109.1zM336 256c0 22.9-1.6 44.2-4.3 64H164.3c-2.7-19.8-4.3-41.1-4.3-64s1.6-44.2 4.3-64h167.4c2.7 19.8 4.3 41.1 4.3 64zM248 40c26.9 0 61.4 44.1 78.1 120H169.9C186.6 84.1 221.1 40 248 40zm-67.5 10.9c-19 26.8-34.2 64.6-43.2 109.1H54.8c25.5-51.2 70.7-90.9 125.7-109.1zM32 256c0-22.3 3.4-43.8 9.7-64h90.5c-2.6 20.5-4.2 41.8-4.2 64s1.5 43.5 4.2 64H41.7c-6.3-20.2-9.7-41.7-9.7-64zm22.8 96h82.5c9 44.4 24.1 82.2 43.2 109.1-55-18.2-100.2-57.9-125.7-109.1zM248 472c-26.9 0-61.4-44.1-78.1-120h156.2c-16.7 75.9-51.2 120-78.1 120zm67.5-10.9c19-26.8 34.2-64.6 43.2-109.1h82.5c-25.5 51.2-70.7 90.9-125.7 109.1zM363.8 320c2.6-20.5 4.2-41.8 4.2-64s-1.5-43.5-4.2-64h90.5c6.3 20.2 9.7 41.7 9.7 64s-3.4 43.8-9.7 64h-90.5z"></path></svg>
</div>
`;

export const getBanner = (Astro: AstroGlobal, clangs: Clang[]): string => {
    let bannerHTML = BANNER;
    const clangId = getClangId(Astro);

    //regex every ###label.something### in bannerHTML with the corresponding label from sprogLabels
    const regex = /###(.*?)###/g;
    const matches = bannerHTML.match(regex);
    if (matches) {
        matches.forEach((match) => {
            const label = match.replace(/###/g, '');
            bannerHTML = bannerHTML.replace(match, t(Astro, label));
        });
    }

    //render language switcher
    let languageSwitcher = LANG_SWITCHER;
    let hasSwitcher = clangs.length > 1;
    const languageSwitcherItems = clangs.map((clang) => {
        if (hasSwitcher) {
            if (clang.id === clangId)
                return `<span class="active">${clang.code}</span>`;
            else return `<a href="${clang.url}">${clang.code}</a>`;
        }
    });

    languageSwitcher = languageSwitcher.replace(
        '<LanguageAnchors/>',
        languageSwitcherItems.join(''),
    );
    bannerHTML = bannerHTML.replace(
        '<cookieBannerLanguageSwitch/>',
        languageSwitcher,
    ).replace(
        '<ToggleButton />',
        (hasSwitcher ? TOGGLE_BUTTON : '')
    );

    bannerHTML = bannerHTML.replace(/"/g, '\\"').replace(/\s+/g, ' ');

    return bannerHTML;
};
