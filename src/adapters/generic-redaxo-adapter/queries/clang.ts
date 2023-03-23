import { gql } from 'graphql-tag';
import { REX_CLANG_FRAGMENT } from './fragments';

export const REX_CLANG_QRY = gql`
    query clangs($articleId: ID!) {
        clangs(articleId: $articleId) {
            ...ClangFragment
        }
    }
    ${REX_CLANG_FRAGMENT}
`;
