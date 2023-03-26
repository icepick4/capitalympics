export const getCurrentMySQLDate = (): string => {
    let date = new Date();
    //translate to mysql date
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
};
