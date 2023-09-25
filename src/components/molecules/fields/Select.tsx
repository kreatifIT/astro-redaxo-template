import { useState } from 'preact/hooks';
import Icon from '@atoms/Icon.tsx';

interface Props {
    name: string;
    items?: any[];
    value?: string;
    class?: string;
    pleaseChoose?: string;
    required?: boolean;
    valueKey?: string;
    labelKey?: string;
    minMax?: [number, number];
    labelIsValue?: string[];
}

export default function Select({
    items,
    name,
    value,
    class: className,
    pleaseChoose,
    valueKey = 'id',
    labelKey = 'name',
    minMax,
    labelIsValue,
    required = false,
}: Props) {
    if (!items && !minMax && !labelIsValue) return false;
    const [selected, setSelected] = useState<any>(value || '');

    if (required && pleaseChoose) {
        pleaseChoose = pleaseChoose + ' *';
    }

    return (
        <div class="relative">
            <select
                name={name}
                id={name}
                onChange={(e) => {
                    setSelected(e.currentTarget.value);
                }}
                class={[
                    'color-neutral-500 peer w-full border border-zinc-300 border-opacity-50 p-2 placeholder-transparent focus:border-opacity-100 focus:shadow-lg focus:outline-none sm:p-4',
                    className,
                ].join(' ')}
            >
                {pleaseChoose && (
                    <option value={''} selected={selected === ''}>
                        {pleaseChoose}
                    </option>
                )}
                {items &&
                    items.map((item) => {
                        return (
                            <option
                                value={item[valueKey]}
                                selected={selected === item[valueKey]}
                            >
                                {item[labelKey]}
                            </option>
                        );
                    })}
                {minMax &&
                    Array.from(Array(Object.values(minMax)[1] + 1).keys())
                        .slice(Object.values(minMax)[0])
                        .map((item) => {
                            return (
                                <option
                                    value={item}
                                    selected={selected === item}
                                >
                                    {item}
                                </option>
                            );
                        })}
                {labelIsValue &&
                    labelIsValue.map((item) => {
                        return (
                            <option value={item} selected={selected === item}>
                                {item}
                            </option>
                        );
                    })}
            </select>
            <Icon
                name="angle-down-light"
                class="pointer-events-none absolute right-2 top-1/2 w-4 -translate-y-1/2 transform sm:right-4"
            />
        </div>
    );
}
