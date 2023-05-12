interface Props {
    filters: any;
    addFilter: any;
}

export default function Filter({ filters, addFilter }: Props) {
    return (
        <>
            {filters.properties?.entities?.map((property: any) => (
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span>{property.translated.name}</span>
                            <span class="transition group-open:rotate-180">
                                <svg
                                    fill="none"
                                    height="24"
                                    shape-rendering="geometricPrecision"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>

                        <div class="mt-5">
                            {property.options.map((option: any) => (
                                <div class="p-2">
                                    <input
                                        type="checkbox"
                                        name="properties"
                                        value={option.id}
                                        id={'property' + option.id}
                                        onChange={(e) => addFilter(e)}
                                    />
                                    <label
                                        for={'property' + option.id}
                                        class="ml-2"
                                    >
                                        {option.translated.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            ))}
        </>
    );
}
