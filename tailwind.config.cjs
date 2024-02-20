const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/@kreatif/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',],
    darkMode: 'media',
    options: {},
    plugins: [require('tailwindcss-hyphens')],
    theme: {
        extend: {
            colors: {
                primary: '#007bff',
                kreatif: {
                    green: '#bcc802',
                    socials: {
                        facebook: '#3b5998',
                        twitter: '#1da1f2',
                        instagram: '#e1306c',
                        youtube: '#ff0000',
                        linkedin: '#0077b5',
                    },
                },
            },
            fontFamily: {
                sans: ['', ...defaultTheme.fontFamily.sans],
            },
        //     fontSize: {
        //         'xs': ['0.78125rem', '140%'], // xs // caption / 10.13 / 130
        //         'sm': ['0.84375rem', '140%'], // sm // 13.5  / 140%
        //         'lg': ['1.125rem', '140%'], // text-lg  // body text actually
        //         '2xl': ['1.5rem', '133%'], // h5 > 24, 133%
        //         '3xl': ['2rem', '112.6'], // h4 > 32, 112.6
        //         '4xl': ['2.675rem', '112.6%'], // h3 > 42.63, 120% 
        //         '5xl': ['3.5rem', '112.6%'], // h2  > 56.8, 112.6%
        //         '8xl': ['6rem', '100px'], // h1 > 96 / 100px
        //    },
        //    screens: {
        //        'md': '704px',
        //         '4xl': '1920px',
        //    },
        },
    },
};

module.exports = config;
