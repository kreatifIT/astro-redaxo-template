import Icon from '@atoms/Icon';
import KRexLink from '@kreatif/starter/components/utils/KRexLink';
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
    if (!link || typeof link !== 'object') return null;
    return (
        <KRexLink
            link={link}
            class={[
                isActive ? 'bg-primary text-white ' : '',
                'flex items-center justify-start gap-2 border px-4 py-2 transition-all duration-500 hover:bg-primary hover:text-white',
                className,
            ].join(' ')}
        >
            {icon && <Icon name={icon} />}
            {link?.label?.length && (
                <span class="z-1 relative">{link.label}</span>
            )}
        </KRexLink>
    );
}
