import KHeading, {
    type HeadingProps,
} from '@kreatif/starter/components/utils/KHeading.tsx';
import type { VNode } from 'preact';

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
interface Props extends HeadingProps {
    size?: HeadingSize;
    defaultTag?: string;
}
function getHeadingSize(size: HeadingSize): string {
    switch (size) {
        case 'h1':
            return 'text-4xl';
        case 'h2':
            return 'text-3xl';
        case 'h3':
            return 'text-2xl';
        case 'h4':
            return 'text-xl';
        case 'h5':
            return 'text-lg';
        case 'h6':
            return 'text-base';
        default:
            return '';
    }
}

export default function Heading({
    size,
    class: className = '',
    defaultTag = 'h2',
    ...props
}: Props) {
    if (size) {
        className += ' ' + getHeadingSize(size);
    }
    return <KHeading class={className} {...props} defaultTag={defaultTag} />;
}
