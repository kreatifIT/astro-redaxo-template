import type { AstroAdapter, AstroGlobal } from 'astro';

export const setProperty = (Astro: any, key: string, value: string) => {
    if (!Astro.request.states) Astro.request.states = new Map<string, any>();
    Astro.request.states.set(key, value);
};

export const getProperty = (Astro: AstroGlobal, key: string) => {
    //@ts-ignore
    if (Astro.request.states && Astro.request.states.has(key))
        //@ts-ignore
        return Astro.request.states.get(key);
    return null;
};

export const getAllProperties = (Astro: AstroGlobal) => {
    //@ts-ignore
    if (Astro.request.states) {
        //convert map to object
        const obj: any = {};
        //@ts-ignore
        Astro.request.states.forEach((value: any, key: string) => {
            obj[key] = value;
        });
        return obj;
    }
    return {};
};

export const getClangId = (Astro: AstroGlobal) => {
    return getProperty(Astro, 'clangId');
};

export const setClangId = (Astro: AstroGlobal, clangId: string) => {
    setProperty(Astro, 'clangId', clangId);
};
