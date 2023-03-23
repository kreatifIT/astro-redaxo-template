import { useState, useEffect } from 'preact/hooks';

interface Preferences {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
}

export default function useIubendaPreferences(): Preferences | null {
    const [iubPreference, setIubPreference] = useState(
        // @ts-ignore
        typeof _iub !== 'undefined' ? _iub?.cs?.consent?.purposes : null,
    );
    useEffect(() => {
        document.addEventListener('iub_changed', () => {
            setIubPreference(
                // @ts-ignore
                typeof _iub !== 'undefined' ? _iub.cs?.consent?.purposes : null,
            );
        });
        return () => {
            document.removeEventListener('iub_changed', () => {
                setIubPreference(
                    // @ts-ignore
                    typeof _iub !== 'undefined'
                        ? // @ts-ignore
                          _iub.cs?.consent?.purposes
                        : null,
                );
            });
        };
    }, []);
    return iubPreference || null;
}
