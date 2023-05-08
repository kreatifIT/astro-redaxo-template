import { useEffect, useState } from 'preact/hooks';
import { ShopwareApiInstanceStore } from './shopware-store';
import { useStore } from '@nanostores/preact';
import {
    ShopwareApiInstance,
    getAvailableCountries,
    getAvailableSalutations,
    register,
} from '@shopware-pwa/shopware-6-client';
import { getShopwareUrl } from '../helpers/client';
import { ShopwareURL } from '../helpers/url';

interface Props {
    salutations: any;
    countries: any;
}

function AdditioanlAdress({ salutations, countries }: Props) {
    return (
        <>
            <div>
                <div class="-mx-3 mb-6 mt-5 mt-20 flex flex-wrap">
                    <div class="w-[100%] px-3">
                        <h2 class="mb-2 border-b pb-2">
                            <b>Abweichende Lieferadresse</b>
                        </h2>
                    </div>

                    <div class="mt-5 w-full px-3">
                        <label for="salutation_shipping">Anrede *</label>
                        <select
                            name="shippingAddress_salutationId"
                            class="block border py-2 px-3"
                            id="salutation_shipping"
                        >
                            <option disabled={true} selected={true} value="">
                                Anrede eingeben ...
                            </option>
                            {salutations?.elements?.map((salutation: any) => (
                                <option value={salutation.id}>
                                    {salutation.translated.displayName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div class="mt-5 w-[50%] px-3">
                        <label for="shipping_first_name">Vorname *</label>
                        <input
                            type="text"
                            name="shippingAddress_firstName"
                            required={true}
                            placeholder="Vorname"
                            class="block w-full border py-2 px-3"
                            id="shipping_first_name"
                        />
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="shipping_last_name">Nachname *</label>
                        <input
                            type="text"
                            name="shippingAddress_lastName"
                            required={true}
                            placeholder="Nachname"
                            class="block w-full border py-2 px-3"
                            id="shipping_last_name"
                        />
                    </div>

                    <div class="mt-5 w-[50%] px-3">
                        <label for="shipping_street">
                            Straße und Hausnummer *
                        </label>
                        <input
                            type="text"
                            name="shippingAddress_street"
                            required={true}
                            placeholder="Straße"
                            class="block w-full border py-2 px-3"
                            id="shipping_street"
                        />
                    </div>
                    <div class="mt-5 w-[15%] px-3">
                        <label for="shipping_plz">PLZ *</label>
                        <input
                            type="text"
                            name="shippingAddress_plz"
                            required={true}
                            placeholder="PLZ"
                            class="block w-full border py-2 px-3"
                            id="shipping_plz"
                        />
                    </div>
                    <div class="mt-5 w-[35%] px-3">
                        <label for="shipping_city">Ort *</label>
                        <input
                            type="text"
                            name="shippingAddress_city"
                            required={true}
                            placeholder="Ort"
                            class="block w-full border py-2 px-3"
                            id="shipping_city"
                        />
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="shipping_country">Land *</label>
                        <select
                            name="shippingAddress_countryId"
                            class="block w-full border py-2 px-3"
                            id="shipping_country"
                        >
                            <option disabled={true} selected={true} value="">
                                Land auswählen ...
                            </option>
                            {countries?.elements?.map((country: any) => (
                                <option value={country.id}>
                                    {country.translated.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function RegistrationForm() {
    const [salutations, setSalutations]: any = useState();
    const [countries, setCountries]: any = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAdditionalForm, setShowAdditionalForm] = useState(false);
    const contextInstance: ShopwareApiInstance = useStore(
        ShopwareApiInstanceStore,
    );

    useEffect(() => {
        if (contextInstance) {
            const _getSalutations = async (
                contextInstance: any,
                setSalutations: any,
            ) => {
                const _response = await getAvailableSalutations(
                    contextInstance as any,
                );
                setSalutations(_response);
            };

            const _getCountries = async (
                contextInstance: any,
                setCountries: any,
            ) => {
                const _response = await getAvailableCountries(
                    contextInstance as any,
                );
                setCountries(_response);
            };

            _getSalutations(contextInstance, setSalutations);
            _getCountries(contextInstance, setCountries);
        }
    }, [contextInstance]);

    const registerFunction = async (e: any) => {
        e.preventDefault();

        const form = document.getElementById('registration') as HTMLFormElement;
        var formData = new FormData(form);
        let formValues: any = {};

        let storefrontUrl =
            window.location.origin + getShopwareUrl(ShopwareURL.SHOP_ROOT);
        formValues.storefrontUrl = storefrontUrl.replace(/\/$/, '');

        formValues.salutationId = formData.get('salutationId')
            ? formData.get('salutationId')
            : '';
        formValues.firstName = formData.get('firstName')
            ? formData.get('firstName')
            : '';
        formValues.lastName = formData.get('lastName')
            ? formData.get('lastName')
            : '';
        formValues.email = formData.get('email') ? formData.get('email') : '';
        formValues.password = formData.get('password')
            ? formData.get('password')
            : '';
        formValues.street = formData.get('street')
            ? formData.get('street')
            : '';
        formValues.zipcode = formData.get('plz') ? formData.get('plz') : '';
        formValues.city = formData.get('city') ? formData.get('city') : '';
        formValues.countryId = formData.get('countryId')
            ? formData.get('countryId')
            : '';
        formValues.acceptedDataProtection = formData.get(
            'acceptedDataProtection',
        )
            ? true
            : false;

        // Billingaddress
        formValues.billingAddress = {
            countryId: formData.get('countryId')
                ? formData.get('countryId')
                : '',
            firstName: formData.get('firstName')
                ? formData.get('firstName')
                : '',
            lastName: formData.get('lastName') ? formData.get('lastName') : '',
            city: formData.get('city') ? formData.get('city') : '',
            street: formData.get('street') ? formData.get('street') : '',
            zipcode: formData.get('plz') ? formData.get('plz') : '',
        };

        let differentDeliveryAddress = formData.get('differentDeliveryAddress')
            ? true
            : false;

        // Shippingaddress
        if (differentDeliveryAddress) {
            formValues.shippingAddress = {
                countryId: formData.get('shippingAddress_countryId')
                    ? formData.get('shippingAddress_countryId')
                    : '',
                firstName: formData.get('shippingAddress_firstName')
                    ? formData.get('shippingAddress_firstName')
                    : '',
                lastName: formData.get('shippingAddress_lastName')
                    ? formData.get('shippingAddress_lastName')
                    : '',
                city: formData.get('shippingAddress_city')
                    ? formData.get('shippingAddress_city')
                    : '',
                street: formData.get('shippingAddress_street')
                    ? formData.get('shippingAddress_street')
                    : '',
                zipcode: formData.get('shippingAddress_plz')
                    ? formData.get('shippingAddress_plz')
                    : '',
            };
        } else {
            formValues.shippingAddress = formValues.billingAddress;
        }

        await register(formValues, contextInstance as any)
            .then((response: any) => {
                window.location.href = '/';
            })
            .catch((error: any) => {
                let additaionlError = '';
                error.messages.map((error: any) => {
                    if (error.code === 'VIOLATION::CUSTOMER_EMAIL_NOT_UNIQUE') {
                        additaionlError =
                            'Die E-Mail Adresse ist bereits registriert.';
                    }
                });
                setErrorMessage(
                    'Bitte kontrollieren und füllen Sie alle Pflichtfleder aus. ' +
                        additaionlError,
                );
            });
        return false;
    };

    return (
        <>
            <form id="registration" method="post">
                {errorMessage && (
                    <div class="relative mt-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                        <span class="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <div class="-mx-3 mb-6 mt-10 flex flex-wrap">
                    <div class="w-full px-3">
                        <label for={salutations?.entity}>Anrede *</label>
                        <select
                            name="salutationId"
                            class="block border py-2 px-3"
                            id={salutations?.entity}
                        >
                            <option disabled={true} selected={true} value="">
                                Anrede eingeben ...
                            </option>
                            {salutations?.elements?.map((salutation: any) => (
                                <option value={salutation.id}>
                                    {salutation.translated.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="first_name">Vorname *</label>
                        <input
                            type="text"
                            name="firstName"
                            required={true}
                            placeholder="Vorname"
                            class="block w-full border py-2 px-3"
                            id="first_name"
                        />
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="last_name">Nachname *</label>
                        <input
                            type="text"
                            name="lastName"
                            required={true}
                            placeholder="Nachname"
                            class="block w-full border py-2 px-3"
                            id="last_name"
                        />
                    </div>

                    <div class="mt-5 w-[50%] px-3">
                        <label for="mail">Email *</label>
                        <input
                            type="mail"
                            name="email"
                            required={true}
                            placeholder="E-Mail"
                            class="block w-full border py-2 px-3"
                            id="mail"
                        />
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="password">Passwort *</label>
                        <input
                            type="password"
                            name="password"
                            required={true}
                            placeholder="Passwort"
                            class="block w-full border py-2 px-3"
                            id="password"
                        />
                        <p class="mt-1 text-xs">
                            Das Passwort muss mindestens 8 Zeichen lang sein.
                        </p>
                    </div>
                </div>

                <div class="-mx-3 mb-6 mt-10 mt-20 flex flex-wrap">
                    <div class="mt-5 w-[100%] px-3">
                        <h2 class="mb-2 border-b pb-2">
                            <b>Ihre Addresse</b>
                        </h2>
                    </div>

                    <div class="mt-5 w-[50%] px-3">
                        <label for="street">Straße und Hausnummer *</label>
                        <input
                            type="text"
                            name="street"
                            required={true}
                            placeholder="Straße"
                            class="block w-full border py-2 px-3"
                            id="street"
                        />
                    </div>
                    <div class="mt-5 w-[15%] px-3">
                        <label for="plz">PLZ *</label>
                        <input
                            type="text"
                            name="plz"
                            required={true}
                            placeholder="PLZ"
                            class="block w-full border py-2 px-3"
                            id="plz"
                        />
                    </div>
                    <div class="mt-5 w-[35%] px-3">
                        <label for="city">Ort *</label>
                        <input
                            type="text"
                            name="city"
                            required={true}
                            placeholder="Ort"
                            class="block w-full border py-2 px-3"
                            id="city"
                        />
                    </div>
                    <div class="mt-5 w-[50%] px-3">
                        <label for="country">Land *</label>
                        <select
                            name="countryId"
                            class="block w-full border py-2 px-3"
                            id="country"
                        >
                            <option disabled={true} selected={true} value="">
                                Land auswählen ...
                            </option>
                            {countries?.elements?.map((country: any) => (
                                <option value={country.id}>
                                    {country.translated.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div class="-mx-3 mb-6 mt-5 mt-20 flex flex-wrap">
                    <div class="mt-5 w-[100%] px-3">
                        <label>
                            <input
                                type="checkbox"
                                class="mr-2"
                                name="differentDeliveryAddress"
                                onChange={() =>
                                    setShowAdditionalForm(!showAdditionalForm)
                                }
                            />
                            Die Lieferadresse weicht von der Rechnungsadresse
                            ab.
                        </label>
                    </div>
                </div>

                {showAdditionalForm ? (
                    <AdditioanlAdress
                        salutations={salutations}
                        countries={countries}
                    />
                ) : null}

                <div class="-mx-3 mb-6 mt-5 mt-20 flex flex-wrap">
                    <div class="mt-5 w-[100%] px-3">
                        <label>
                            <input
                                type="checkbox"
                                name="acceptedDataProtection"
                                class="mr-2"
                                required={true}
                            />
                            Ich habe die{' '}
                            <a href="#todo">Datenschutzerklärung</a> gelesen und
                            akzeptiere diese.
                        </label>
                    </div>

                    <div class="mt-5 w-[100%] items-end px-3">
                        {/* Submit button rechte seite */}
                        <button
                            type="submit"
                            class="float-right self-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                            onClick={(e) => registerFunction(e)}
                        >
                            Absenden
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
