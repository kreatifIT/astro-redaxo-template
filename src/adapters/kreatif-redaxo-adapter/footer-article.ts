import { gql } from 'graphql-tag';
import type { Article } from '../redaxo/@types';
import {
    REX_ARTICLE_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
} from '@adapters/redaxo/fragments';
import GraphQLClient from '@adapters/redaxo/client';

export async function getFooterArticle(clangId: string) {
    const { data } = await GraphQLClient.query(
        REX_FOOTER_ARTICLE_QRY,
        {},
        clangId,
    );
    return data.footerArticle as Article;
}

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
