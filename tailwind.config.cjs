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
                fontFamily: {
                    sans: ['', ...defaultTheme.fontFamily.sans],
                }
            },
        },
    },
};

module.exports = config;
