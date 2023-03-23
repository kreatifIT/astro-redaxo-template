/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'media',
    options: {},
    plugins: [require('tailwindcss-hyphens')],
    theme: {
        colors: {
            primary: '#66c195',
            white: '#f9f9f9',
            blank: '#ffffff',
            transparent: 'transparent',
            kreatif: {
                green: '#bcc802',
            },
            gray: {
                100: '#f4f4f4',
                125: '#a9a7a7',
                150: '#eaeaea',
                175: '#9a9a9a',
                200: '#ededed',
                300: '#c8c8c8',
                400: '#dedede',
                450: '#5c5b5b',
                500: '#636262',
                600: '#3f3e3e',
                800: '#242424',
            },
            socials: {
                /* generated with copilot */
                facebook: '#3b5998',
                twitter: '#1da1f2',
                instagram: '#e1306c',
                youtube: '#ff0000',
                linkedin: '#0077b5',
            },
        },
        extend: {
            boxShadow: {
                imageTextSlide: '0 5px 20px rgba(0, 0, 0, 0.1)',
                logo: '0 0 20px rgba(0, 0, 0, 0.1)',
            },
            fontSize: {
                lg: ['1.125rem', '1.5rem'],
                xl: ['1.25rem', '1.625rem'],
                '2xl': ['1.5rem', '1.75rem'],
            },
            spacing: {
                8.5: '2.175rem',
            },
        },
    },
};

module.exports = config;
