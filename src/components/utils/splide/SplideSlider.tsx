import { Splide } from '@splidejs/react-splide';
import type { SplideProps } from '@splidejs/react-splide';
import { useEffect, useRef } from 'preact/hooks';
import { addSplide, removeSplide } from './splide-store';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import '@splidejs/splide/dist/css/splide-core.min.css';
import './Splide.scss';

interface Props extends SplideProps {
    id: string;
}

export default function SplideSlider({ id, children, ...props }: Props) {
    const ref = useRef<Splide>(null);

    const onMounted = () => {
        const splide = ref.current;
        if (splide) {
            addSplide(id, splide.splide!);
        }
    };
    const onUnmounted = () => {
        removeSplide(id);
    };
    useEffect(() => {
        return () => {
            removeSplide(id);
        };
    }, [id]);

    return (
        //@ts-ignore
        <Splide
            {...props}
            onMounted={onMounted}
            onUnmounted={onUnmounted}
            ref={ref}
        >
            {children}
        </Splide>
    );
}
