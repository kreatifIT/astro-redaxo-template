import { REX_NAVIGATION_ITEM_FRAGMENT } from './fragments';
import { gql } from 'graphql-tag';

export const REX_ROOT_NAVIGATION_QRY = gql`
    query rootNavigation($depth: Int!, $articleId: ID!) {
        rootNavigation(depth: $depth, articleId: $articleId) {
            ...NavigationItemFragment
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
`;

export const REX_NAVIGATION_QRY = gql`
    query navigation($name: String!, $articleId: ID!) {
        navigation(name: $name, articleId: $articleId) {
            ...NavigationItemFragment
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
`;
