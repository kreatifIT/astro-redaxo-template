import type { Link } from 'redaxo-adapter';
import Heading from '@atoms/Heading.tsx';
import RichText from '@atoms/rich-text/RichText.tsx';
import Button from '@atoms/Button.tsx';

interface Props {
    title_small?: string;
    title_large?: string;
    text?: string;
    link?: Link;
}

export default function TitleText({
    title_small,
    title_large,
    text,
    link,
}: Props) {
    return (
        <div class="flex flex-col items-start gap-6">
            <Heading size="h2" text={title_large} />
            <Heading size="h3" text={title_small} />
            <RichText text={text} class="text" />
            <Button link={link} />
        </div>
    );
}
