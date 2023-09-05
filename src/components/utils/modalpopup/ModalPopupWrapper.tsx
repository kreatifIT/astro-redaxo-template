import { useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import './ModalPopup.scss';

interface Props {
    children: any;
    visible: boolean;
    closeAction?: () => void;
}

export default function ModalPopup({ children, visible, closeAction }: Props) {
    const [shown, setShown] = useState<boolean>(false);
    const closingTag = 'A';
    useEffect(() => {
        if (visible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
            document.addEventListener('click', (element) => {
                const clickTarget = element.target as HTMLElement;
                const isLink = clickTarget.tagName == closingTag || clickTarget?.parentNode?.tagName == closingTag;
                if (element?.target?.classList?.contains('popup-inner') || isLink) {
                    closeAction?.();
                }
            });
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
            setShown(true);
        } else {
            setTimeout(() => {
                setShown(false);
            }, 150);
        }
    }, [visible]);

    if (typeof document === undefined) return null;
    if (!shown) return null;
    const target = document.querySelector('#popup-target')!
    if (!target) return null;
    return createPortal(
        <div
            class={[
                'modalpopup-wrapper',
                visible ? '' : 'modalpopup-out',
                "fixed inset-0 after:bg-gray-900 after:opacity-70 after:absolute after:inset-0 after:-z-10"].join(' ')}>
            <div className="inner absolute inset-0 modalpopup-inner">
                {children}
            </div>
        </div>,
        target
    );

}