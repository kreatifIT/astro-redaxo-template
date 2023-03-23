import { gql } from 'graphql-tag';

export const REX_WILDCARDS_QRY = gql`
    query WildCards {
        wildCards {
            id
            wildcard
            replace
        }
    }
`;
