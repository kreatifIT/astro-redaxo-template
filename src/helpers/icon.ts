import fontInfo from './../../public/fonts/iconFont/info.json';

export const getIcon = (name: string): string => {
    // @ts-ignore
    const icon: any = fontInfo[name];
    if (!icon) {
        return '□';
    }
    return unescape('%u' + icon['encodedCode'].replace('\\', '')) || '□';
};
