import type { ProjectSettings } from './@types';
import { gql } from 'graphql-tag';
import {
    REX_CONTACT_FRAGMENT,
    REX_ORGANIZATION_FRAGMENT,
    REX_TOKEN_FRAGMENT,
} from './fragments';
import type { Wildcard } from '@adapters/redaxo/@types';
import GraphQLClient from '@adapters/redaxo/client';

const FRAGMENTS = gql`
    ${REX_ORGANIZATION_FRAGMENT}
    ${REX_CONTACT_FRAGMENT}
    ${REX_TOKEN_FRAGMENT}
`;

export const KREATIF_WILDCARD_QRY = gql`
    query wildcards {
        wildCards {
            id
            wildcard
            replace
        }
        projectSettings {
            organization {
                ...OrganizationFragment
            }
            contact {
                ...ContactFragment
            }
            seoGeoRegion
            websiteName
            iubendaCookieBanner {
                bannerData
                showLanguageSwitch
            }
            tokens {
                ...TokenFragment
            }
        }
    }
    ${FRAGMENTS}
`;

export async function getKreatifWildcards(langId: string): Promise<{
    wildCards: Wildcard[];
    projectSettings: ProjectSettings;
}> {
    const { data } = await GraphQLClient.query(
        KREATIF_WILDCARD_QRY,
        {},
        langId,
    );
    return data;
}
