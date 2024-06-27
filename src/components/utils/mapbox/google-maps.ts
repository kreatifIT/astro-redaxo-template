import type { ProjectSettings } from '@kreatif/starter/adapter/@types';

export function getGoogleMapsLink(projectSettings: ProjectSettings) {
    return getGoogleMapsLinkLatLng(projectSettings.contact.coordinates);
}

export function getGoogleMapsLinkLatLng(coordinates: number[]): string {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates.join(
        ',',
    )}`;
}
