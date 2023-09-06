import { createPortal, useEffect, useState } from 'preact/compat';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    children: any;
    visible: boolean;
}

export default function PopupWrapper({ children, visible }: Props) {
    const [shown, setShown] = useState<boolean>(false);
    useEffect(() => {
        if (visible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
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
    return createPortal(
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, translateY: "100%" }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    class={[
                        'popup-wrapper',
                        "fixed inset-0 after:bg-white after:opacity-95 after:absolute after:inset-0 after:-z-10"].join(' ')}>
                    <div className="inner absolute inset-0 top-0 b-0 md:flex md:flex-col md:justify-center">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        ,
        document.querySelector('#popup-target')!
    );

}