import {
    REX_ARTICLE_BY_PATH_QRY,
    REX_ARTICLE_QRY,
    REX_ROOT_ARTICLES_QRY,
    REX_SITE_START_ARTICLE_QRY,
} from './queries/article';
import type {
    Article,
    ArticleIncludes,
    Category,
    CategoryIncludes,
    Clang,
    Media,
    NavigationItem,
    Wildcard,
} from './@types';
import { REX_ROOT_CATEGORIES_QRY } from './queries/category';
import { REX_CLANG_QRY } from './queries/clang';
import { REX_MEDIA_QRY } from './queries/media';
import GraphQLClient from './graphql-client';
import { REX_WILDCARDS_QRY } from '@adapters/generic-redaxo-adapter/queries/wildcards';
import {
    REX_NAVIGATION_QRY,
    REX_ROOT_NAVIGATION_QRY,
} from '@adapters/generic-redaxo-adapter/queries/navigation';

export class GenericRedaxoAdapter {
    protected static redaxo: GraphQLClient = new GraphQLClient();
    protected static REDAXO_ROOT = import.meta.env.REDAXO_ROOT as string;

    protected static getArticleIncludes(includes?: ArticleIncludes) {
        return {
            includeSlices: includes?.slices || false,
            includeClang: includes?.clang || false,
            includeSeo: includes?.seo || false,
            includeBreadcrumbs: includes?.breadcrumbs || false,
        };
    }

    protected static getCategoryIncludes(includes?: CategoryIncludes) {
        return {
            includeChildren: includes?.children || false,
            includeArticles: includes?.articles || false,
            includeStartArticle: includes?.startArticle || false,
        };
    }

    public static async getArticleByPath(
        path: string,
        clangId: string,
        includes?: ArticleIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_ARTICLE_BY_PATH_QRY,
            {
                path,
                ...this.getArticleIncludes(includes),
            },
            clangId,
        );
        return data.articleByPath as Article;
    }

    public static async getRootArticles(
        clangId: string,
        includes?: ArticleIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_ROOT_ARTICLES_QRY,
            {
                ...this.getArticleIncludes(includes),
            },
            clangId,
        );
        return data.rootArticles as Article[];
    }

    public static async getRootCategories(
        clangId: string,
        includes?: CategoryIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_ROOT_CATEGORIES_QRY,
            {
                ...this.getCategoryIncludes(includes),
            },
            clangId,
        );
        return data.rootCategories as Category[];
    }

    public static async getClangs(articleId: string, clangId: string) {
        const { data } = await this.redaxo.query(
            REX_CLANG_QRY,
            {
                articleId,
            },
            clangId,
        );
        return data.clangs as Clang[];
    }

    public static getMediaUrl(media: string, imageType?: string) {
        if (imageType) {
            return `${this.REDAXO_ROOT}/media/${imageType}/${media}`;
        }
        return `${this.REDAXO_ROOT}/media/${media}`;
    }

    public static async getMedia(
        name: string,
        imageType: string,
        clangId: string,
    ) {
        const { data } = await this.redaxo.query(
            REX_MEDIA_QRY,
            {
                name,
                imageType,
            },
            clangId,
        );
        return data.media as Media;
    }

    public static async getArticleById(
        id: string,
        clangId: string,
        includes?: ArticleIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_ARTICLE_QRY,
            {
                id,
                ...this.getArticleIncludes(includes),
            },
            clangId,
        );
        return data.article as Article;
    }

    public static async getSiteStartArticle(
        clangId: string,
        includes?: ArticleIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_SITE_START_ARTICLE_QRY,
            {
                ...this.getArticleIncludes(includes),
            },
            clangId,
        );
        return data.siteStartArticle as Article;
    }

    public static async getWildcards(clangId: string) {
        const { data } = await this.redaxo.query(
            REX_WILDCARDS_QRY,
            {},
            clangId,
        );
        return data.wildCards as Wildcard[];
    }

    public static async getRootNavigation(
        clangId: string,
        id: string,
        depth: number,
    ) {
        const { data } = await this.redaxo.query(
            REX_ROOT_NAVIGATION_QRY,
            {
                depth,
                articleId: id,
            },
            clangId,
        );
        return data.rootNavigation as NavigationItem[];
    }

    public static async getNavigation(
        clangId: string,
        id: string,
        name: string,
    ) {
        const { data } = await this.redaxo.query(
            REX_NAVIGATION_QRY,
            {
                name,
                articleId: id,
            },
            clangId,
        );
        return data.navigation as NavigationItem[];
    }
}
