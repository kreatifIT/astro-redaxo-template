interface Props {
    class?: string;
    label?: string;
    darkBg?: boolean;
}

export default function Submit({ label, class: className, darkBg }: Props) {
    return (
        <button
            type="submit"
            class="text-stone-900 px-6 py-2 border font-serif items-center justify-center flex gap-2 uppercase transition-all outline-none duration-300 hover:text-white hover:bg-primary"
        >
            {label}
        </button>
    );
}
