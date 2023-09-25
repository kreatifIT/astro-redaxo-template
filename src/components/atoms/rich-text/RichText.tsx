import './RichText.scss';

interface Props {
    text?: string;
    class?: string;
}

export default function RichText({ text, class: className = '' }: Props) {
    if (!text) return null;
    return (
        <div
            className={'rich-text ' + className}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
}
