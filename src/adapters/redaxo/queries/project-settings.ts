import { REX_MEDIA_FRAGMENT } from '@adapters/generic-redaxo-adapter/queries/fragments';
import { gql } from 'graphql-tag';

export const REX_ORGANIZATION_FRAGMENT = gql`
    fragment OrganizationFragment on Organization {
        name
        streetAddress
        zip
        city
        region
        province
        country
        isoCountryCode
        vatNumber
        chamberOfCommerce
        chamberOfCommerceNumber
        reaNumber
        shareholderEquity
        images {
            ...MediaFragment
        }
    }
    ${REX_MEDIA_FRAGMENT}
`;

export const REX_CONTACT_FRAGMENT = gql`
    fragment ContactFragment on Contact {
        phone
        email
        emailPec
        socials {
            name
            url
        }
        coordinates
    }
`;

export const REX_TOKEN_FRAGMENT = gql`
    fragment TokenFragment on Tokens {
        googleTagManager
        googleAnalytics
        googleWebmasterId
        bingValidateId
        facebookPixelId
        facebookDomainVerification
        linkedInInsightId
        mapboxAccessToken
    }
`;

const FRAGMENTS = gql`
    ${REX_ORGANIZATION_FRAGMENT}
    ${REX_CONTACT_FRAGMENT}
    ${REX_TOKEN_FRAGMENT}
`;

export const REX_PROJECT_SETTINGS_QRY = gql`
    query ProjectSettings(
        $includeOrganization: Boolean!
        $includeContact: Boolean!
        $includeIubenda: Boolean!
        $includeTokens: Boolean!
    ) {
        projectSettings {
            organization @include(if: $includeOrganization) {
                ...OrganizationFragment
            }
            contact @include(if: $includeContact) {
                ...ContactFragment
            }
            seoGeoRegion
            websiteName
            iubendaCookieBanner @include(if: $includeIubenda) {
                bannerData
                showLanguageSwitch
            }
            tokens @include(if: $includeTokens) {
                ...TokenFragment
            }
        }
    }
    ${FRAGMENTS}
`;
