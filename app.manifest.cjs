//Refer to https://www.npmjs.com/package/favicons for more configuration options
const manifest = {
    path: '/favicons',
    pathLight: '/favicons/light',
    pathDark: '/favicons/dark',
    appName: 'Vision4Plant',
    appShortName: 'Vision4Plant',
    appDescription: 'Vision4Plant',
    developerName: 'Kreatif IT',
    developerURL: 'https://kreatif.it',
    background: '#f9f9f9',
    theme_color: '#66c195',
    appleStatusBarStyle: 'black-translucent',
    display: 'standalone',
    orientation: 'any',
    scope: '/',
    start_url: '/',
    version: '1.0',
    icons: {
        favicons: true,
        android: false,
        appleIcon: false,
        appleStartup: false,
        windows: false,
        yandex: false,
    },
    //shortcuts: []
};

module.exports = manifest;
