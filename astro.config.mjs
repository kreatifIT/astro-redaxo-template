import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import partytown from '@astrojs/partytown';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    integrations: [
        preact({ compat: true }),
        tailwind(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],
    vite: {
        ssr: {
            noExternal: [
                '@splidejs/react-splide',
                'react-map-gl',
                '@splidejs/splide-extension-video',
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
    adapter: cloudflare(),
    output: 'server',
});
