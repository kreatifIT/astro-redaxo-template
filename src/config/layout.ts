import {initRedaxoPage as init} from '@kreatif/starter/adapter/init';
import type {AstroGlobal} from "astro";

export const initRedaxoAdapter = (Astro: AstroGlobal, path?: string) => init({
    Astro, redaxoEndpoint: import.meta.env.PUBLIC_REDAXO_ENDPOINT,
    redaxoRoot: import.meta.env.PUBLIC_REDAXO_ROOT,
    redaxoSecret: import.meta.env.PUBLIC_REDAXO_SECRET,
    variables: {
        navigationDepth: 2,
        path
    }
});

