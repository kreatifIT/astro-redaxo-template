interface Props {
    text: string;
    class: string;
}

export default function Heading({ text, class: className }: Props) {
    const html = text.replace(/<(\w+)>/g, `<$1 class="${className}">`);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
