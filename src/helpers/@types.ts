import type { ArticleSlice, Article } from 'redaxo-adapter';
export interface ArticleAnchor {
    title: string;
    iconClassName: string;
    id: string;
}

export type ModuleProps = {
    slice: ArticleSlice;
    article: Article;
};
