import type { Media } from '@adapters/generic-redaxo-adapter/@types';

interface Props extends Media {
    contain?: boolean;
    class?: string;
}

export default function Image({
    alt,
    focusPoint,
    width,
    src,
    height,
    contain,
    class: className,
}: Props) {
    const _focusPoint =
        focusPoint && focusPoint.length === 2
            ? `${focusPoint[0]}% ${focusPoint[1]}%`
            : 'center';
    return (
        <img
            src={src}
            alt={alt}
            srcset={src}
            width={width}
            loading="lazy"
            height={height}
            className={
                (contain ? 'object-contain ' : 'object-cover ') + className
            }
            style={{
                objectPosition: _focusPoint,
            }}
        />
    );
}
