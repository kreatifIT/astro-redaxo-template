import { useState } from 'preact/compat';

export default function Hamburger() {
    const [open, setOpen] = useState(false);
    return (
        <button
            class="space-y-1.5"
            title="Menu"
            onClick={() => {
                setOpen(!open);
            }}
        >
            <span
                class={[
                    'block h-0.5 w-6 bg-gray-800 transition-transform',
                    open ? 'translate-y-2 rotate-45' : '',
                ].join(' ')}
            ></span>
            <span
                class={[
                    'block h-0.5 w-6 bg-gray-800 transition-opacity',
                    open ? 'opacity-0' : '',
                ].join(' ')}
            ></span>
            <span
                className={[
                    'block h-0.5 w-6 bg-gray-800 transition-transform',
                    open ? '-translate-y-2 -rotate-45' : '',
                ].join(' ')}
            ></span>
        </button>
    );
}
