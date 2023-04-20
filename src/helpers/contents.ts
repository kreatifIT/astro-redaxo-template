import { getArticleById } from '@adapters/redaxo/article';
import Article from '@contents/Article';

type ResolverFunction = (id: string, clangId: string) => Promise<any>;

export const typeToComponent = new Map<string, any>([['article', Article]]);

export const typeToResolver = new Map<string, ResolverFunction>([
    [
        'article',
        (id, clangId) => {
            return getArticleById(id, clangId, {
                clang: false,
                breadcrumbs: true,
                seo: true,
                slices: true,
            });
        },
    ],
]);
