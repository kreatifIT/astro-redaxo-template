import { REX_MEDIA_FRAGMENT } from 'redaxo-adapter';
import gql from 'graphql-tag';

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
        recaptchaSiteKey
    }
`;
