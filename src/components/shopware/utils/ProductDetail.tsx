import { ShopwareApiInstanceStore, customerStore } from './shopware-store';
import { useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import ProductWhistlist from '../atoms/ProductWhistlist';
import AddToCart from '../atoms/AddToCart';
import {
    formatPrice,
    getClangCodeFromCookie,
    getThumbnail,
} from '../helpers/client';
import { getProduct, getProducts } from '@shopware-pwa/shopware-6-client';
import useTranslations from '@helpers/translations/client';

interface Props {
    product: any;
    configurator: any;
}

// Varianten Filter nur aktiv wenn die komibination möglich ist
// CrossSelling einbauen
// nach dem wechseln der varianten Whistlist updaten

export default function ProductDetail({ product, configurator }: Props) {
    const [_product, setProduct] = useState(product);
    const customer = useStore(customerStore);
    const contextInstance = useStore(ShopwareApiInstanceStore);
    const [message, setMessage] = useState('');

    const clangCode = getClangCodeFromCookie();
    const t = useTranslations(clangCode, 'shopware');

    const switchOption = async (optionId: string) => {
        const form = document.getElementById(
            'variant_switcher',
        ) as HTMLFormElement;
        const formulatValues = new FormData(form);
        const formProps = Object.fromEntries(formulatValues);
        const options = Object.values(formProps);

        if (_product?.parentId) {
            let optionFilter = options.map((option: any) => {
                return {
                    type: 'equals',
                    field: 'optionIds',
                    value: option,
                };
            });

            const _resonse = await getProducts(
                {
                    associations: {
                        media: [],
                    },
                    filter: [
                        {
                            type: 'equals',
                            field: 'parentId',
                            value: _product.parentId,
                        },
                        {
                            type: 'multi',
                            operator: 'and',
                            queries: optionFilter,
                        },
                    ],
                },
                contextInstance as any,
            )
                .then((res: any) => {
                    if (res?.elements?.length > 0) {
                        setProduct(res.elements[0]);
                        history.pushState(
                            {},
                            '',
                            res.elements[0].seoUrls[0].seoPathInfo,
                        );
                    } else {
                        setMessage(
                            'Die Komibination konnte nicht geladen Produktes',
                        );
                    }
                })
                .catch((err: any) => {
                    setMessage(
                        'Die Komibination konnte nicht geladen Produktes',
                    );
                });

            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    return (
        <>
            <div class="row">
                <div class="flex">
                    <div class="w-[40%]">
                        {_product?.media?.map((media: any) => (
                            <img
                                src={getThumbnail(media.media, 400, 400)}
                                alt={media.alt ? media.alt : media.fileName}
                            />
                        ))}
                    </div>
                    <div class="ml-auto w-[50%]">
                        <h1 class="pr-15	relative mb-2 text-5xl">
                            {_product.translated.name}
                            {customer && (
                                <div class="absolute right-0 top-0 float-right h-12">
                                    <ProductWhistlist
                                        productId={_product.id}
                                        setLoading={undefined}
                                    />
                                </div>
                            )}
                        </h1>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: _product.translated.description,
                            }}
                        />
                        {message && (
                            <div class="relative mb-5 mt-5 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                                <span class="block sm:inline">{message}</span>
                            </div>
                        )}
                        {configurator.length > 0 && (
                            <div class="mb-5 mt-5">
                                <form
                                    action={'' + _product.id + '/switch/'}
                                    method="GET"
                                    id="variant_switcher"
                                >
                                    {configurator.map((config: any) => (
                                        <div class="mb-5 mt-5">
                                            <b>{config.translated.name}:</b>
                                            {config.options.map(
                                                (_options: any) => (
                                                    <div class="mt-1">
                                                        <input
                                                            type="radio"
                                                            class=""
                                                            name={config.id}
                                                            value={_options.id}
                                                            id={
                                                                _options.id +
                                                                '-' +
                                                                config.id
                                                            }
                                                            checked={
                                                                _product.optionIds.includes(
                                                                    _options.id,
                                                                )
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={() =>
                                                                switchOption(
                                                                    _options.id,
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            for={
                                                                _options.id +
                                                                '-' +
                                                                config.id
                                                            }
                                                            class="ml-2"
                                                        >
                                                            {
                                                                _options
                                                                    .translated
                                                                    .name
                                                            }
                                                        </label>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ))}
                                </form>
                            </div>
                        )}

                        {_product.calculatedPrices.length > 0 ? (
                            <>
                                <div class="mb-10 mt-10">
                                    <div class="flex flex-wrap bg-gray-200 p-2">
                                        <div class="w-[50%]">{t('amount')}</div>
                                        <div class="w-[50%]">
                                            {t('quantity')}
                                        </div>
                                    </div>
                                    {_product.calculatedPrices.map(
                                        (price: any) => (
                                            <>
                                                <div class="flex flex-wrap p-2">
                                                    <div class="w-[50%]">
                                                        {price.quantity}
                                                    </div>
                                                    <div class="w-[50%]">
                                                        {formatPrice(
                                                            price.unitPrice,
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ),
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {formatPrice(
                                    _product.calculatedPrice.unitPrice,
                                )}
                            </>
                        )}

                        {customer ? (
                            <div class="mb-14  mt-5">
                                <AddToCart
                                    product={_product}
                                    showQuantity={true}
                                />
                            </div>
                        ) : (
                            <div class="mb-14  mt-5">
                                <div class="bg-red-600 p-2 text-center text-white">
                                    {t('login_to_add_to_cart')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
