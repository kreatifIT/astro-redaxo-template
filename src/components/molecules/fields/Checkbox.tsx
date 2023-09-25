interface Props {
    name: string;
    value?: string;
    label?: string;
    required?: boolean;
}

export default function Checkbox({
    name,
    value,
    label,
    required = false,
}: Props) {
    return (
        <>
            <label for={name} class="flex gap-4 items-center">
                <input
                    id={name}
                    type="checkbox"
                    value={value}
                    name={name}
                    class=""
                    required={required}
                />
                {label && (
                    <span
                        class="text-neutral-500 text-opacity-70 text-sm font-light leading-[18.20px]"
                        dangerouslySetInnerHTML={{ __html: label }}
                    ></span>
                )}
            </label>
        </>
    );
}
