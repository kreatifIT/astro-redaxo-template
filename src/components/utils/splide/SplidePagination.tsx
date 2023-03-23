import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { splideStore } from './splide-store';
import SplidePaginationItem from './SplidePaginationItem';

interface Props {
    id: string;
    count: number;
}
export default function SplidePagination({ id, count }: Props) {
    const [activeIdx, setActiveIdx] = useState(0);
    const splides = useStore(splideStore);
    useEffect(() => {
        const splide = splides[id];
        if (splide) {
            splide.on('moved', (newIndex) => {
                setActiveIdx(newIndex);
            });
        }
        return () => {
            if (splide) {
                splide.off('moved');
            }
        };
    }, [id, splides]);

    return Array.from({ length: count }).map((_, idx) => (
        <SplidePaginationItem
            active={activeIdx === idx}
            onClick={() => {
                const splide = splides[id];
                if (splide) {
                    splide.go(idx);
                }
            }}
        />
    ));
}
