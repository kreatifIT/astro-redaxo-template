import Icon from '../../../../@kreatif/starter/components/Icon';
import RexLink from '../../../../@kreatif/starter/components/RexLink';
import type { Link } from 'redaxo-adapter';

interface Props {
    link?: Link;
    class?: string;
    icon?: string;
    isActive?: boolean;
}

export default function Button({
    link,
    class: className = '',
    icon,
    isActive,
}: Props) {
    if (!link) return null;

    return (
        <RexLink
            link={link}
            class={[
                isActive ? 'bg-primary text-white ' : '',
                'border p-4 gap-2 flex items-center justify-start hover:text-white hover:bg-primary transition-all duration-500',
                className,
            ].join(' ')}
        >
            {icon && <Icon name={icon} />}
            {link?.label?.length && (
                <span class="z-1 relative">{link.label}</span>
            )}
        </RexLink>
    );
}
