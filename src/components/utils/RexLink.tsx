import type { Link } from '@adapters/redaxo/@types';
import type { ComponentChild } from 'preact';

interface Props {
    link: Link;
    title?: string;
    class?: string;
    children?: ComponentChild;
}

export default function RexLink({
    link,
    title,
    children,
    class: className,
}: Props) {
    return (
        <a
            class={className}
            href={link.url}
            target={link.target}
            rel="noopener noreferrer"
            title={title}
        >
            {children ?? link.label}
        </a>
    );
}
