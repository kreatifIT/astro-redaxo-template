import type { Link } from '@adapters/redaxo/@types';

interface Props {
    link: Link;
    title?: string;
    class?: string;
}

export default function RexLink({ link, title, class: className }: Props) {
    return (
        <a
            class={className}
            href={link.url}
            target={link.target}
            rel="noopener noreferrer"
            title={title}
        >
            <slot />
        </a>
    );
}
