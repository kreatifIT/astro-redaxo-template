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
            'process.env.REDAXO_ENDPOINT': JSON.stringify(
                process.env.REDAXO_ENDPOINT,
            ),
            'process.env.REDAXO_ROOT': JSON.stringify(process.env.REDAXO_ROOT),
            'process.env.FRONTEND_ROOT': JSON.stringify(
                process.env.FRONTEND_ROOT,
            ),
        },
    },
    adapter: cloudflare(),
    output: 'server',
});
