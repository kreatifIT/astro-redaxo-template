const fontName = process.env.npm_config_font;
const path = require('path');
const fs = require('fs');
const woff = require('ttf2woff');
const woff2 = require('ttf2woff2');

const convert = (font) => {
    const fontPath = path.join(__dirname, `../public/fonts/${font}`);
    //for every file in fontPath
    fs.readdirSync(fontPath).forEach((file) => {
        if (path.extname(file) === '.ttf') {
            const input = fs.readFileSync(path.join(fontPath, file));
            //convert ttf to woff2
            fs.writeFileSync(
                path.join(fontPath, path.basename(file, '.ttf') + '.woff2'),
                Buffer.from(woff2(input).buffer),
            );
            //convert ttf to woff
            fs.writeFileSync(
                path.join(fontPath, path.basename(file, '.ttf') + '.woff'),
                Buffer.from(woff(input).buffer),
            );
        }
    });
};

console.log('Converting font ' + fontName + '...');

if (fontName) convert(fontName);
else console.log('Usage: npm run convertFont.cjs --font=fontname');
