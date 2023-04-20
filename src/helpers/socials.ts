import type { Social } from '@adapters/kreatif-redaxo-adapter/@types';

const socialMediaClasses = new Map<string, string>([
    ['facebook', 'hover:before:bg-socials-facebook'],
    ['instagram', 'hover:before:bg-socials-instagram'],
    ['twitter', 'hover:before:bg-socials-twitter'],
    ['youtube', 'hover:before:bg-socials-youtube'],
    ['linkedin', 'hover:before:bg-socials-linkedin'],
    ['pinterest', 'hover:before:bg-socials-pinterest'],
]);

const socialMediaIcons = new Map<string, string>([
    ['facebook', 'square-facebook'],
    ['instagram', 'instagram'],
    ['twitter', 'twitter'],
    ['youtube', 'youtube'],
    ['linkedin', 'linkedin'],
    ['pinterest', 'pinterest'],
]);

interface SocialMediaItem {
    name: string;
    url: string;
    class: string;
    icon: string;
}

export const getSocialMediaMap = (items: Social[]) => {
    const socialMediaItems = new Map<string, SocialMediaItem>();

    items.forEach(({ name, url }) => {
        socialMediaItems.set(name, {
            name,
            url,
            class: socialMediaClasses.get(name) || '',
            icon: socialMediaIcons.get(name) || '',
        });
    });

    return socialMediaItems;
};
