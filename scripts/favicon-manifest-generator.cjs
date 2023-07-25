const { favicons } = require('favicons');
const path = require('path');
const fs = require('fs');
const manifest = require('../app.manifest.cjs');
const jsdom = require('jsdom');
const faviconsComponent = path.join(
    __dirname,
    '../src/components/layout/head/Favicons.astro',
);

const source = getFaviconPath('favicon');
if (fs.existsSync(source)) {
    console.log('Detected single favicon for light and dark mode.');
    const dest = path.join(__dirname, '../public/favicons');

    favicons(source, manifest).then((generationOutput) => {
        generateFavicons(generationOutput, dest);

        const html = generationOutput.html.join('\n');
        fs.writeFileSync(faviconsComponent, '---\n---\n\n' + html);
        console.log('Favicon generated successfully.');
    });
} else {
    console.log('Detected different favicon for light and dark mode.');
    const sourceLight = getFaviconPath('favicon-light');
    const sourceDark = getFaviconPath('favicon-dark');
    const destLight = path.join(__dirname, '../public/favicons/light');
    const destDark = path.join(__dirname, '../public/favicons/dark');
    fs.mkdirSync(destLight, { recursive: true });
    fs.mkdirSync(destDark, { recursive: true });

    const manifestLight = { ...manifest, path: manifest.pathLight };
    const manifestDark = { ...manifest, path: manifest.pathDark };

    favicons(sourceLight, manifestLight)
        .then((generationOutput) => {
            generateFavicons(generationOutput, destLight);

            const html1 = parseFaviconHtml(
                generationOutput.html.join('\n'),
                'light',
            );
            fs.writeFileSync(faviconsComponent, '---\n---\n\n' + html1);
            console.log('Light favicon generated successfully.');
        })
        .then(() => {
            favicons(sourceDark, manifestDark).then((generationOutput) => {
                generateFavicons(generationOutput, destDark);
                const html2 = parseFaviconHtml(
                    generationOutput.html.join('\n'),
                    'dark',
                );

                fs.appendFileSync(faviconsComponent, html2);
                console.log('Dark favicon generated successfully.');
            });
        });
}

function getFaviconPath(name) {
    const source = path.join(__dirname, `../public/${name}.png`);
    if (fs.existsSync(source)) return source;

    return path.join(__dirname, `../public/${name}.svg`);
}

function generateFavicons(generationOutput, dest) {
    generationOutput.images.map((image) =>
        fs.writeFileSync(path.join(dest, image.name), image.contents),
    );

    generationOutput.files.map((file) =>
        fs.writeFileSync(path.join(dest, file.name), file.contents),
    );
}

function parseFaviconHtml(html, preferredColorScheme) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html>${html}`);
    const links = dom.window.document.querySelectorAll('link');
    let string = '';
    links.forEach((link) => {
        if (link.media) {
            link.media =
                link.media +
                ` and (prefers-color-scheme: ${preferredColorScheme})`;
        } else {
            link.media = `(prefers-color-scheme: ${preferredColorScheme})`;
        }
        string += link.outerHTML + '\n';
    });
    return string;
}
