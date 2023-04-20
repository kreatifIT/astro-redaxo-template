import gql from 'graphql-tag';
import type { ContentType } from './@types';
import GraphQLClient from '@adapters/redaxo/client';

const CONTENT_TYPE_QRY = gql`
    query contentTypeByPath($path: String!) {
        contentTypeByPath(path: $path) {
            elementId
            type
            clang {
                id
            }
        }
    }
`;

export async function getContentTypeByPath(
    path: string,
    clangId: string,
): Promise<ContentType> {
    const { data } = await GraphQLClient.query(
        CONTENT_TYPE_QRY,
        { path },
        clangId,
    );
    return data.contentTypeByPath;
}
