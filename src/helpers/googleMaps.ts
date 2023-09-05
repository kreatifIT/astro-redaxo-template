import type { ProjectSettings } from '@adapters/redaxo/@types';

export const getGoogleMapsLink = (projectSettings: ProjectSettings): string => {
    return `https://www.google.com/maps/search/?api=1&query=${projectSettings.contact?.coordinates.join(
        ',',
    )}`;
};
