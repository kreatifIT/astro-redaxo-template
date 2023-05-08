import 'video.js/dist/video-js.css';
import useIubendaPreferences from '../iubenda/useIubendaPreferences';
import videojs from 'video.js';
import { useRef, useEffect } from 'preact/hooks';
import type Player from 'video.js/dist/types/player';
import 'videojs-youtube/dist/Youtube.min.js';
import './VideoJsPlayer.scss';

interface Props {
    type: 'video/youtube' | 'video/mp4';
    poster?: string;
    src: string;
    autoplay?: boolean;
    onReady?: (player: Player) => void;
}

export default function VideoJSPlayer({
    src,
    poster,
    type,
    onReady,
    autoplay,
}: Props) {
    const iubendaPreferences = useIubendaPreferences();
    const playerRef = useRef<Player>();
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            type === 'video/youtube' &&
            (!iubendaPreferences || !iubendaPreferences[3])
        ) {
            return;
        }
        if (!playerRef.current && videoRef.current) {
            const videoElement = document.createElement('video-js');

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current!.appendChild(videoElement);

            const player = (playerRef.current = videojs(
                videoElement,
                {
                    controls: true,
                    autoplay: autoplay,
                    preload: 'auto',
                    fluid: true,
                    poster,
                    techOrder: ['youtube', 'html5'],
                    sources: [
                        {
                            src,
                            type,
                        },
                    ],
                },
                () => {
                    onReady && onReady(player);
                },
            ));
        } else {
            const player = playerRef.current;

            player!.autoplay(autoplay);
            player!.src([
                {
                    src,
                    type,
                },
            ]);
            player!.poster(poster);
        }
    }, [autoplay, src, poster, iubendaPreferences]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = undefined;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}
