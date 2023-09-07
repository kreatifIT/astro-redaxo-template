import { useState } from 'preact/hooks';
import Icon from "@utils/Icon";

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
    required = false
}: Props) {
    if (!items && !minMax && !labelIsValue) return false;
    const [selected, setSelected] = useState<any>(value || '');

    if (required && pleaseChoose) {
        pleaseChoose = pleaseChoose + ' *';
    }

    return (
        <div class="relative">

            <select name={name}
                id={name}
                onChange={(e) => {
                    setSelected(e.currentTarget.value);
                }}
                class={[
                    'border w-full border-zinc-300 border-opacity-50 color-neutral-500 p-2 sm:p-4 placeholder-transparent focus:outline-none focus:shadow-lg focus:border-opacity-100 peer',
                    className,
                ].join(' ')}>
                {
                    pleaseChoose && <option value={""} selected={selected === ""}>{pleaseChoose}</option>
                }
                {
                    items && items.map((item) => {
                        return <option value={item[valueKey]} selected={selected === item[valueKey]}>{item[labelKey]}</option>
                    })
                }
                {
                    minMax && Array.from(Array(Object.values(minMax)[1] + 1).keys()).slice(Object.values(minMax)[0]).map((item) => {
                        return <option value={item} selected={selected === item}>{item}</option>
                    })
                }
                {
                    labelIsValue && labelIsValue.map((item) => {
                        return <option value={item} selected={selected === item}>{item}</option>
                    })
                }
            </select>
            <Icon name="angle-down-light" class="pointer-events-none absolute right-2 sm:right-4 top-1/2 transform w-4 -translate-y-1/2" />
        </div>

    );
}
