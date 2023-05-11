import {
    REX_CONTACT_FRAGMENT,
    REX_ORGANIZATION_FRAGMENT,
    REX_TOKEN_FRAGMENT,
} from './fragments';
import {
    Article,
    Clang,
    NavigationItem,
    RedaxoAdapter,
    Wildcard,
    REX_BREADCRUMB_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
    REX_NAVIGATION_ITEM_FRAGMENT,
} from 'redaxo-adapter';
import gql from 'graphql-tag';
import type { ContentType, ProjectSettings } from './@types';

const KREATIF_LAYOUT_QRY = gql`
    query layout($navigationDepth: Int!, $articlePath: String!) {
        contentTypeByPath(path: $articlePath) {
            elementId
            type
            metadata {
                title
                description
                robots
                canonical
                createdAt
                updatedAt
                image {
                    ...MediaFragment
                }
                breadcrumbs {
                    ...BreadcrumbFragment
                }
            }
            clangs {
                id
                active
                url
                code
            }
        }
        articleByPath(path: $articlePath) {
            id
            name
            url
            slices {
                ...ArticleSliceFragment
            }
        }
        rootNavigation(depth: $navigationDepth) {
            ...NavigationItemFragment
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
        wildCards {
            id
            wildcard
            replace
        }
        projectSettings {
            organization {
                ...OrganizationFragment
            }
            contact {
                ...ContactFragment
            }
            seoGeoRegion
            websiteName
            iubendaCookieBanner {
                bannerData
                showLanguageSwitch
            }
            tokens {
                ...TokenFragment
            }
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
    ${REX_ORGANIZATION_FRAGMENT}
    ${REX_TOKEN_FRAGMENT}
    ${REX_CONTACT_FRAGMENT}
    ${REX_BREADCRUMB_FRAGMENT}
`;

export async function getInitialData(
    path: string,
    navigationDepth: number,
): Promise<{
    clangs: Clang[];
    navigation: NavigationItem[];
    siteStartArticle: Article;
    footerArticle: Article;
    projectSettings: ProjectSettings;
    article: Article;
    wildCards: Wildcard[];
    contentType: ContentType;
}> {
    const { data } = await RedaxoAdapter.query(
        KREATIF_LAYOUT_QRY,
        {
            navigationDepth,
            articlePath: path,
        },
        '1',
    );
    return {
        clangs: data.contentTypeByPath.clangs,
        navigation: data.rootNavigation,
        siteStartArticle: data.siteStartArticle,
        footerArticle: data.footerArticle,
        projectSettings: data.projectSettings,
        article: data.articleByPath,
        wildCards: data.wildCards,
        contentType: data.contentTypeByPath,
    };
}
