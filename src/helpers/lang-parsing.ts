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

export const getDatepickerTodayDate = (): string => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0! 
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
};
