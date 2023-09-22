import BaseIcon from '@kreatif/starter/components/utils/Icon.tsx';
import iconJson from '../../../public/fonts/iconFont/info.json';
import {getIconFromJson} from '@kreatif/starter/utils/icon.ts';

interface Props {
    name: string;
    class?: string;
}

export default function Icon({name, class: className = ''}: Props) {
    return <BaseIcon class={className} icon={getIcon(name)}/>;
}
export function getIcon(name: string) {
    return getIconFromJson(name, iconJson);
}
