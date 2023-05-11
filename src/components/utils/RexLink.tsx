import type { ComponentChild } from 'preact';
import type { Link } from 'redaxo-adapter';

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
