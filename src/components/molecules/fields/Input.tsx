import Icon from '@atoms/Icon.tsx';

interface Props {
    name: string;
    value?: string;
    placeholder?: string;
    class?: string;
    min?: string;
    type?: 'text' | 'email' | 'password' | 'date';
}

export default function Input({
    name,
    value,
    placeholder,
    class: className,
    type = 'text',
    min,
}: Props) {
    const isDateField = type === 'date';
    return (
        <>
            <input
                type={isDateField ? 'text' : type}
                value={value}
                name={name}
                id={name}
                placeholder={placeholder}
                {...(isDateField && min && { min })}
                {...(isDateField && { onFocus: (e) => (e.currentTarget.type = 'date') })}
                {...(isDateField && { onBlur: (e) => (e.currentTarget.type = 'text') })}
                class={[
                    'color-neutral-500 peer w-full border border-zinc-300 border-opacity-50 p-4 font-light placeholder-transparent focus:border-opacity-100 focus:shadow-lg focus:outline-none',
                    isDateField ? 'pr-10' : '',
                    className,
                ].join(' ')}
            />
            {isDateField && (
                <Icon
                    name="calendar"
                    class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transform leading-[100%]"
                />
            )}
        </>
    );
}
