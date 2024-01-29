import KIcon from '@kreatif/starter/components/utils/KIcon';
import iconJson from '../../../public/fonts/iconFont/info.json';
import { getIconFromJson } from '@kreatif/starter/utils/icon.ts';

interface Props {
    name: string;
    class?: string;
}

export default function Icon({ name, class: className = '' }: Props) {
    return <KIcon class={className} icon={getIcon(name.replace('iconFont-', ''))} />;
}
export function getIcon(name: string) {
    return getIconFromJson(name, iconJson);
}
