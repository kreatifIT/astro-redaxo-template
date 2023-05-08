export interface VideoProps {
    type: 'video/youtube' | 'video/mp4';
    poster?: string;
    src: string;
    autoplay?: boolean;
}
