import { useStore } from '@nanostores/preact';
import Image from '@utils/image/Image';
import useIubendaPreferences from '@utils/iubenda/useIubendaPreferences';
import type { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { splideStore } from './splide-store';
import type { Media } from 'redaxo-adapter';

export interface Props {
    id: string;
    youtubeUrl?: string;
    video?: string;
    image?: Media;
    children: JSX.Element;
}

export default function SplideSlide({
    id,
    youtubeUrl,
    video,
    image,
    children,
}: Props) {
    const iubendaPreferences = useIubendaPreferences();
    const splides = useStore(splideStore);
    useEffect(() => {
        if (iubendaPreferences && iubendaPreferences[3]) {
            splides[id]?.refresh();
        }
    }, [iubendaPreferences, id]);
    const youtubeId = youtubeUrl?.split('v=')[1];
    return (
        <li
            class={'splide__slide'}
            data-splide-youtube={
                iubendaPreferences && iubendaPreferences[3] ? youtubeId : null
            }
            data-splide-html-video={video}
        >
            {children}
            <div className="splide__slide__container">
                {image && <Image {...image} />}
            </div>
        </li>
    );
}
