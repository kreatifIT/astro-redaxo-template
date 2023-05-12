interface Props {
    sortings: any;
    currentSorting: any;
    setCurrentSorting: any;
}

export default function ProductSorting({
    sortings,
    currentSorting,
    setCurrentSorting,
}: Props) {
    return (
        <div>
            <h2 class="mb-5 border-b pb-2">Sorting</h2>
            <select
                class="mb-5 w-full rounded border border-gray-300 p-2"
                onChange={(e) => setCurrentSorting(e?.target?.value)}
            >
                {sortings?.map((sorting: any) => (
                    <option
                        value={sorting.key}
                        selected={sorting.key === currentSorting}
                    >
                        {sorting.translated.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
