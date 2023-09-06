import { h } from 'preact';

interface Props {
    text?: string;
    class?: string;
    defaultTag?: string;
    size?: 'small' | 'huge' | 'large' | 'tiny';
}

export default function Heading({
    text,
    class: className = '',
    defaultTag = 'h2',
    size,
}: Props) {
    switch (size) {
        case 'tiny':
            className += ' text-base leading-1';
            break;
        case 'small':
            className += ' text-2xl font-loose text-black';
            break;
        case 'large':
            className +=
                ' text-[31.98px] leading-9 xl:text-[42.63px] xl:leading-[48px]';
            break;
        case 'xlarge':
            className +=
                ' text-[31.98px] leading-9 md:text-4xl md:leading-normal xl:text-[56.83px] xl:leading-[64px] text-black';
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