import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import redaxo from '@kreatif/starter/integrations/redaxo.mjs';

// https://astro.build/config
export default defineConfig({
    integrations: [
        preact({compat: true}),
        tailwind(),
        redaxo(),
    ],
    vite: {
        ssr: {
            noExternal: [
                '@splidejs/react-splide',
                'react-map-gl',
                '@splidejs/splide-extension-video',
                'framer-motion',
            ],
        },
        define: {
            'process.env.PUBLIC_REDAXO_ENDPOINT': JSON.stringify(
                process.env.PUBLIC_REDAXO_ENDPOINT,
            ),
            'process.env.PUBLIC_REDAXO_ROOT': JSON.stringify(process.env.PUBLIC_REDAXO_ROOT),
            'process.env.FRONTEND_ROOT': JSON.stringify(
                process.env.FRONTEND_ROOT,
            ),
            'process.env.REDAXO_SHARED_SECRET': JSON.stringify(
                process.env.REDAXO_SHARED_SECRET,
            ),
        },
    },
    adapter: cloudflare({
        mode: 'advanced'
    }),
    output: 'server',
});
