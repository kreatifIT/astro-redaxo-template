interface Props {
    class?: string;
    noPadding?: boolean;
    children: any;
}

export default function Container({
    class: className = '',
    noPadding = false,
    noGap = false,
    children,
}: Props) {
    return (
        <div
            class={[
                'max-w-[1680px] mx-auto relative z-1 w-full grid',
                !noGap ? 'gap-4' : '',
                !noPadding ? 'px-4' : '',
                className,
            ].join(' ')}
        >
            {children}
        </div>);

}
