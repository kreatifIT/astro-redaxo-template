export const formatPrice = (price: string, langCode: string) => {
    if (!price) return '';
    return Number(price).toLocaleString(langCode, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export const getFormattedDateWithWords = (date: string, clang: string): string => {
    return new Date(date).toLocaleString(clang,
        {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'long',
        }
    );
};

export const getFormattedDateNumeric = (date: string, clang: string): string => {
    return new Date(date).toLocaleString(clang,
        {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit',
        }
    );
};
