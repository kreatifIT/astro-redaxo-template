export const parseModuleValues = (values?: Record<number, string> | string) => {
    if (!values) return {};
    if (typeof values === 'string') return JSON.parse(values);
    return values;
};
