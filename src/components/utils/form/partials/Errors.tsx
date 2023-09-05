import type { FormError } from "@helpers/@types";


interface Props {
    errors: FormError[];
    wildcards?: Map<string, string>;
}

export default function Errors({
    errors, wildcards
}: Props) {
    if (!errors.length) return null;
    return (
        <ul class="bg-red-400 p-4 lg:p-6 text-white text-lg font-light mb-4">
            {errors.map((error) => (
                <li>
                    {wildcards
                        ?.get(error.wildcard)
                        ?.replace(
                            '{{fieldname}}',
                            wildcards?.get(`label.${error.field}`) ??
                            '',
                        )}
                </li>
            ))}
        </ul>
    )
}
