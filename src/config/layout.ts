import {
    kInitRedaxoPage,
    buildInitialQuery,
    buildContentTypeFields,
    buildProjectSettingsFields,
} from '@kreatif/starter/adapter/init';
import type { AstroGlobal } from 'astro';
import { moduleToMediaType } from '@config/modules.ts';

export const initRedaxoAdapter = (Astro: AstroGlobal, path?: string) =>
    kInitRedaxoPage({
        Astro,
        variables: {
            navigationDepth: 2,
            path,
            mediaMapping: moduleToMediaType,
        },
        redaxo: {
            endpoint: import.meta.env.PUBLIC_REDAXO_ENDPOINT,
            root: import.meta.env.PUBLIC_REDAXO_ROOT,
            secret: import.meta.env.REDAXO_SECRET,
        },
        initialQuery: buildInitialQuery({
            projectSettingsFields: buildProjectSettingsFields({}),
            contentTypeFields: buildContentTypeFields({}),
        }),
    });
