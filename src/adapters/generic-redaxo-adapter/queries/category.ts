import { gql } from 'graphql-tag';
import { REX_CATEGORY_FRAGMENT, REX_ARTICLE_FRAGMENT } from './fragments';

const FRAGMENTS = gql`
    ${REX_CATEGORY_FRAGMENT}
    ${REX_ARTICLE_FRAGMENT}
`;

export const REX_ROOT_CATEGORIES_QRY = gql`
    query rootCategories(
        $includeChildren: Boolean!
        $includeArticles: Boolean!
        $includeStartArticle: Boolean!
    ) {
        rootCategories {
            ...CategoryFragment
            children @include(if: $includeChildren) {
                ...CategoryFragment
            }
            articles @include(if: $includeArticles) {
                ...ArticleFragment
            }
            startArticle @include(if: $includeStartArticle) {
                ...ArticleFragment
            }
        }
    }
    ${FRAGMENTS}
`;
