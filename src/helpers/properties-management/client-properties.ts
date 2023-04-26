export const setProperty = (key: string, value: string) => {
    // @ts-ignore
    if (!window._properties) {
        // @ts-ignore
        window._properties = {};
    }
    // @ts-ignore
    window._properties[key] = value;
};

export const getProperty = (key: string) => {
    // @ts-ignore
    if (window._properties && window._properties[key])
        // @ts-ignore
        return window._properties[key];
    return null;
};

export const getAllProperties = () => {
    // @ts-ignore
    if (window._properties) {
        // @ts-ignore
        return window._properties;
    }
    return {};
};
