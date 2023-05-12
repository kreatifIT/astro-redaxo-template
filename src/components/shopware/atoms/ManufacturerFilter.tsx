import useTranslations from '@helpers/translations/client';
import { getClangCodeFromCookie } from '../helpers/client';

interface Props {
    filters: any;
    addFilter: any;
}

export default function ManufacturerFilter({ filters, addFilter }: Props) {
    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');
    return (
        <>
            {filters.manufacturer?.entities.length > 0 && (
                <details class="group">
                    <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span>{t('manufacturer')}</span>
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
                    <div class="py-5">
                        {filters.manufacturer?.entities.map(
                            (manfuacturer: any) => (
                                <div class="p-2">
                                    <input
                                        type="checkbox"
                                        name="manufacturer"
                                        value={manfuacturer.id}
                                        id={'manufacturer' + manfuacturer.id}
                                        onChange={(e) => addFilter(e)}
                                    />
                                    <label
                                        for={'manufacturer' + manfuacturer.id}
                                        class="ml-2"
                                    >
                                        {manfuacturer.translated.name}
                                    </label>
                                </div>
                            ),
                        )}
                    </div>
                </details>
            )}
        </>
    );
}
