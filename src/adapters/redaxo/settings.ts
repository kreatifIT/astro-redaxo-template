import gql from "graphql-tag";
import { Article, REX_ARTICLE_FRAGMENT, RedaxoAdapter, REX_ARTICLE_SLICE_FRAGMENT } from "redaxo-adapter";


const ARTICLE_MAPPING_QRY = gql`
    query articleMapping($key: String!) {
        articleMapping(key: $key) {
            ...ArticleFragment
            link {
                id
                label
                url
                target
            }
        }
    }
    ${REX_ARTICLE_FRAGMENT}
`;

const ARTICLE_MAPPING_SLICES_QRY = gql`
    query articleMapping($key: String!) {
        articleMapping(key: $key) {
            slices { ...ArticleSliceFragment }
        }
    }
    ${REX_ARTICLE_SLICE_FRAGMENT}
`;


export async function getArticleMapping(key: string, clangId: string): Promise<Article> {
    const { data } = await RedaxoAdapter.query(ARTICLE_MAPPING_QRY,
        { key }, clangId);
    return data.articleMapping;
}

export async function getArticleMappingWithSlices(key: string, clangId: string): Promise<Article> {
    const { data } = await RedaxoAdapter.query(ARTICLE_MAPPING_SLICES_QRY,
        { key }, clangId);
    return data.articleMapping;
}
