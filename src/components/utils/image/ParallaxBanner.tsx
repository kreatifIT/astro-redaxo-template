import useRedaxoAdapter from '@adapters/redaxo/useRedaxoAdapter';
import { useEffect, useRef } from 'preact/hooks';
import { RedaxoAdapter, getMediaUrl } from 'redaxo-adapter';
import type Ukiyo from 'ukiyojs';

interface Props {
    children?: any;
}

export default function ParallaxBanner({ children }: Props) {
    RedaxoAdapter.init(import.meta.env.PUBLIC_REDAXO_ENDPOINT, import.meta.env.PUBLIC_REDAXO_ROOT);
    const image = useRef<HTMLImageElement>(null);
    useEffect(() => {
        if (image.current) {
            let item: Ukiyo;
            import('ukiyojs').then((module) => item = new module.default(image.current!.querySelector('img'), {
                speed: 2,
                scale: 1.05,
            }));
            return () => {
                item?.destroy();
            }

        }
    }, [image.current]);

    return (
        <div ref={image}>
            {
                children
            }
        </div>

    );
}