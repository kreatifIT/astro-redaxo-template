import { useEffect, useRef, useState } from 'preact/hooks';
import './Aos.scss';

interface Props {
    inactiveClass?: string;
    activeClass?: string;
    children: any;
    showEffect?: boolean;
}

export default function Aos({
    inactiveClass = 'inactive',
    activeClass = 'active',
    showEffect = true,
    children,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (ref.current && showEffect) {
            const observer = new IntersectionObserver(
                (entries) => {
                    setVisible(entries[0].isIntersecting);
                },
                {
                    rootMargin: '300px 0px 300px 0px'

                },
            );
            observer.observe(ref.current);

            return () => observer.disconnect();
        }
    }, [ref]);
    return (
        <div
            class={['aos', visible || !showEffect ? activeClass : inactiveClass].join(' ')}
            ref={ref}
        >
            {children}
        </div>
    );
}
