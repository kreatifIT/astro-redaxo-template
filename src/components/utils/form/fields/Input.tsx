import Icon from "@utils/Icon";

interface Props {
    name: string;
    value?: string;
    placeholder?: string;
    class?: string;
    darkBg?: boolean;
    type?: 'text' | 'email' | 'password';
}

export default function Input({
    name,
    value,
    placeholder,
    class: className,
    darkBg,
    type = 'text',
}: Props) {
    const isDateField = type === 'date';
    return (
        <>
            <input
                type={type}
                value={value}
                name={name}
                id={name}
                placeholder={placeholder}
                class={[
                    'font-light border w-full border-zinc-300 border-opacity-50 color-neutral-500 p-4 placeholder-transparent focus:outline-none focus:shadow-lg focus:border-opacity-100 peer',
                    isDateField ? 'pr-10' : '',
                    className,
                ].join(' ')}
            />
            {isDateField && <Icon name="calendar" class="leading-[100%] pointer-events-none absolute right-4 top-1/2 transform w-4 h-4 -translate-y-1/2" />}
        </>
    );
}