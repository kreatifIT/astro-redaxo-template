
interface Props {
    name: string;
    value?: string;
    placeholder?: string;
    class?: string;
    darkBg?: boolean;
}

export default function TextArea({
    name,
    value,
    placeholder,
    class: className,
    darkBg,
}: Props) {
    return (
        <textarea
            type="text"
            name={name}
            id={name}
            rows={3}
            placeholder={placeholder}
            class={[
                'border w-full border-zinc-300 border-opacity-50 color-neutral-500 p-2 sm:p-4 placeholder-transparent focus:outline-none focus:shadow-lg focus:border-opacity-100 peer',
                className,
            ].join(' ')}
        />
    );
}
