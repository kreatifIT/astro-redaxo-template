export const setProperty = (key: string, value: string) => {
    // @ts-ignore
    if (!window._states) {
        // @ts-ignore
        window._states = {};
    }
    // @ts-ignore
    window._states[key] = value;
};

export const getProperty = (key: string) => {
    // @ts-ignore
    if (window._states && window._states[key])
        // @ts-ignore
        return window._states[key];
    return null;
};

export const getAllProperties = () => {
    // @ts-ignore
    if (window._states) {
        // @ts-ignore
        return window._states;
    }
    return {};
};
