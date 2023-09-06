import { h } from 'preact';

interface Props {
    text?: string;
    class?: string;
    defaultTag?: string;
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
}

export default function Heading({
    text,
    class: className = '',
    defaultTag = 'h2',
    size,
}: Props) {
    switch (size) {
        case 'tiny':
            className += ' text-sm md:text-base xl:text-lg';
            break;
        case 'small':
            className += 'text-base md:text-lg xl:text-xl';
            break;
        case 'medium':
            className += 'text-lg md:text-xl xl:text-2xl';
            break;
        case 'large':
            className +=
                ' text-xl md:text-2xl xl:text-3xl';
            break;
        case 'xlarge':
            className +=
                ' text-2xl md:text-3xl  xl:text-4xl';
            break;
    }
    if (!text) return null;
    if (!text.includes('<')) {
        text = `<${defaultTag}>${text}</${defaultTag}>`;
    }
    className += '  heading heading-font font-light';
    const tag = text?.match(/<(\w+)>/)?.[1] ?? 'h1';
    text = text?.match(/>(.*)</)?.[1] ?? '';
    return h(tag, {
        dangerouslySetInnerHTML: { __html: text },
        class: className,
    });
}