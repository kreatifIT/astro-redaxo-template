import '@vime/core/themes/default.css';
import useIubendaPreferences from './iubenda/useIubendaPreferences';
import { Player, DefaultUi, Youtube, Video } from '@vime/react';

interface Props {
    src: string;
    poster?: string;
    type: string;
}

export default function VideoPlayer({ src, poster, type }: Props) {
    const iubendaPreferences = useIubendaPreferences();

    const parseVideoId = (url: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };
    return (
        <Player>
            {type === 'youtube' &&
                iubendaPreferences &&
                iubendaPreferences[3] && (
                    <Youtube
                        poster={poster}
                        videoId={parseVideoId(src)}
                    ></Youtube>
                )}
            {type === 'video/mp4' && (
                <Video>
                    <source data-src={src} type="video/mp4" />
                </Video>
            )}
            <DefaultUi />
        </Player>
    );
}
