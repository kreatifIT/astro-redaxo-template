import { gql } from 'graphql-tag';
import { REX_MEDIA_FRAGMENT } from './fragments';

export const REX_MEDIA_QRY = gql`
    query Media($name: String!, $imageType: String!) {
        media(name: $name, imageType: $imageType) {
            ...MediaFragment
        }
    }
    ${REX_MEDIA_FRAGMENT}
`;
