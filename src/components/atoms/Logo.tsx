import type {Article} from 'redaxo-adapter';


interface Props1 {
    siteStartArticle: Article;
}

interface Props2 {
    url: string;
}

export default function Logo(props: Props1 | Props2) {
    // @ts-ignore
    const url = props.url || props.siteStartArticle.url;
    return <a href={url}>
        <img
            src="/img/logo.svg"
            loading="lazy"
            alt="Logo"
            width="225"
            height="65"
            className="mr-4 h-10 w-auto md:h-14 md:w-40 lg:h-auto lg:w-48 xl:w-56"
        />
    </a>
}

