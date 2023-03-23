module.exports = {
    plugins: [
        require.resolve('prettier-plugin-astro'),
        require.resolve('prettier-plugin-tailwindcss'),
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
};
