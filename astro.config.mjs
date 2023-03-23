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
            noExternal: ['@splidejs/react-splide', 'react-map-gl', '@splidejs/splide-extension-video', '@vime/react'],
        },
    },
    adapter: cloudflare(),
    output: 'server',
});
