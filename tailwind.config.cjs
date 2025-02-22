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
        //         'xs': ['0.75rem', '1rem'], // 12px / 16px
        //         'sm': ['0.875rem', '1.25rem'], // 14px / 20px
        //         'base': ['1rem', '1.5rem'], // 16px / 24px
        //         'lg': ['1.125rem', '1.75rem'], // 18px / 28px
        //         'xl': ['1.25rem', '1.75rem'], // 20px / 28px
        //         '2xl': ['1.5rem', '2rem'], // 24px / 32px
        //         '3xl': ['1.875rem', '2.25rem'], // 30px / 36px
        //         '4xl': ['2.25rem', '2.5rem'], // 36px / 40px
        //         '5xl': ['3rem', '1'], // 48px / 56px
        //         '6xl': ['3.75rem', '1'], // 60px / 64px
        //         '7xl': ['4.5rem', '1'], // 72px / 80px
        //         '8xl': ['6rem', '1'], // 96px / 104px
        //         '9xl': ['8rem', '1'], // 128px / 136px
        //    },
        //    screens: {
        //        'md': '704px',
        //         '4xl': '1920px',
        //    },
        },
    },
};

module.exports = config;
