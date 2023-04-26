import { getIcon } from '@helpers/icon';

type Props = {
    name: string;
    class: string;
};

export default function Icon({ name, class: className }: Props) {
    return (
        <i className={`icon-element ${name} ${className}`}>
            {getIcon(name.replace('iconFont-', ''))}
        </i>
    );
}
