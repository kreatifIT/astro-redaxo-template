import { gql } from 'graphql-tag';
import {
    REX_ARTICLE_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
} from '../../generic-redaxo-adapter/queries/fragments';

const FRAGMENTS = gql`
    ${REX_ARTICLE_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
`;

export const REX_FOOTER_ARTICLE_QRY = gql`
    query FooterArticle {
        footerArticle {
            ...ArticleFragment
            slices {
                ...ArticleSliceFragment
            }
        }
    }
    ${FRAGMENTS}
`;
