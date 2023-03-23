import { gql } from 'graphql-tag';
import {
    REX_ARTICLE_FRAGMENT,
    REX_CLANG_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
    REX_SEO_FRAGMENT,
    REX_BREADCRUMB_FRAGMENT,
} from './fragments';

const FRAGMENTS = gql`
    ${REX_ARTICLE_FRAGMENT}
    ${REX_CLANG_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
    ${REX_SEO_FRAGMENT}
    ${REX_BREADCRUMB_FRAGMENT}
`;

export const REX_ARTICLE_QRY = gql`
    query article(
        $id: ID!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        article(id: $id) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

export const REX_ARTICLE_BY_PATH_QRY = gql`
    query articleByPath(
        $path: String!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        articleByPath(path: $path) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

export const REX_ROOT_ARTICLES_QRY = gql`
    query rootArticles(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        rootArticles {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

export const REX_SITE_START_ARTICLE_QRY = gql`
    query siteStartArticle(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        siteStartArticle {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;
