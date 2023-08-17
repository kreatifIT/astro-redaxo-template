interface Props {
    text?: string;
    class: string;
}

export default function Heading({ text, class: className }: Props) {
    if (!text) return null;
    if (!text.includes('<')) {
        text = `<h2>${text}</h2>`;
    }
    const html = text.replace(/<(\w+)>/g, `<$1 class="${className} heading">`);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
