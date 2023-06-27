import { getIcon } from '@helpers/icon';

type Props = {
    name: string;
    class: string;
};

export default function Icon({ name, class: className }: Props) {
    return (
        <span className={`icon-element ${name} ${className}`}>
            {getIcon(name.replace('iconFont-', ''))}
        </span>
    );
}
