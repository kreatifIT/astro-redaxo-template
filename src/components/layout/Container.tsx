interface Props {
    class?: string;
    noPadding?: boolean;
    children: any;
}

export default function Container({
                                      class: className = '',
                                      noPadding = false,
                                      children,
                                  }: Props) {
    return (
        <div
            class={[
                'max-w-[1680px] mx-auto relative z-1 w-full flex flex-col',
                !noPadding ? 'px-4' : '',
                className,
            ].join(' ')}
        >
            {children}
        </div>);

}
