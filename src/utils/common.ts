export const getCurrentMySQLDate = (): string => {
    let date = new Date();
    //translate to mysql date
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
};

export const isSetUser = (): boolean => {
    if (localStorage.getItem('user_id') !== null) {
        return true;
    }
    return false;
};

export const isSetToken = (): boolean => {
    if (localStorage.getItem('token') !== null) {
        return true;
    }
    return false;
};

export const getLocalStorageUser = (): number => {
    const user_id = localStorage.getItem('user_id');
    return parseInt(user_id!);
};
export const getLocalStorageToken = (): string => {
    const token = localStorage.getItem('token');
    return token!;
};

export const setLocalStorageUser = (user_id: string) => {
    localStorage.setItem('user_id', user_id);
};
export const setLocalStorageToken = (token: string) => {
    localStorage.setItem('token', token);
};
