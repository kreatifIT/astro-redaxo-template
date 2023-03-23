import { useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { splideStore } from './splide-store';

interface Props {
    active: boolean;
    onClick: () => void;
}

export default function SplidePaginationItem({ active, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            class={
                'relative h-6 w-6 cursor-pointer rounded-full border-2 border-transparent transition-colors before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-[1px] before:border-gray-500 before:opacity-50 before:transition-colors before:hover:border-primary before:hover:bg-primary before:hover:opacity-100' +
                (active
                    ? ' border-primary before:border-primary before:bg-primary before:opacity-100'
                    : ' ')
            }
            title="Slider Button"
        ></button>
    );
}
