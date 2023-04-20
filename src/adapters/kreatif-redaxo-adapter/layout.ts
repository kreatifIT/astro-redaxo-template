import type { Article, Clang, NavigationItem } from '@adapters/redaxo/@types';
import GraphQLClient from '@adapters/redaxo/client';
import {
    REX_ARTICLE_SLICE_FRAGMENT,
    REX_NAVIGATION_ITEM_FRAGMENT,
} from '@adapters/redaxo/fragments';
import gql from 'graphql-tag';

const KREATIF_LAYOUT_QRY = gql`
    query layout($navigationDepth: Int!, $articleId: ID!) {
        rootNavigation(depth: $navigationDepth, articleId: $articleId) {
            ...NavigationItemFragment
        }
        clangs(articleId: $articleId) {
            id
            code
            url
            active
        }
        siteStartArticle {
            id
            url
        }
        footerArticle {
            id
            slices {
                ...ArticleSliceFragment
            }
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
`;

export async function getLayoutData(
    navigationDepth: number,
    articleId: string,
    clangId: string,
): Promise<{
    clangs: Clang[];
    rootNavigation: NavigationItem[];
    siteStartArticle: Article;
    footerArticle?: Article;
}> {
    const { data } = await GraphQLClient.query(
        KREATIF_LAYOUT_QRY,
        {
            navigationDepth,
            articleId,
        },
        clangId,
    );
    return data;
}
