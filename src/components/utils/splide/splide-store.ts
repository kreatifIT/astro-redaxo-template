import type { Splide } from '@splidejs/splide';
import { atom } from 'nanostores';

export const splideStore = atom<Record<string, Splide>>({});

export const addSplide = (id: string, splide: Splide) => {
    const map = splideStore.get();
    const newMap = {
        ...map,
        [id]: splide,
    };
    splideStore.set(newMap);
};
export const removeSplide = (id: string) => {
    const map = splideStore.get();
    delete map[id];
    const newMap = {
        ...map,
    };
    splideStore.set(newMap);
};
