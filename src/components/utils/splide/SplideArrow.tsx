import { useStore } from '@nanostores/preact';
import type { JSX } from 'preact';
import { splideStore } from './splide-store';

interface Props {
    children: JSX.Element;
    next?: boolean;
    prev?: boolean;
    id: string;
}

export default function SplideArrow({ children, next, prev, id }: Props) {
    const sliders = useStore(splideStore);
    return (
        <button
            onClick={() => {
                const slider = sliders[id];
                if (slider) {
                    if (next) {
                        slider.go('+');
                    } else if (prev) {
                        slider.go('-');
                    }
                }
            }}
        >
            {children}
        </button>
    );
}
