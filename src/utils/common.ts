import { Level } from '../models/User';

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

export const getLevelName = (level: Level): string => {
    switch (level) {
        case -1: // -1 is for the user who has never played
            return 'No score';
        case 0:
            return 'Newcomer';
        case 1:
            return 'Beginner';
        case 2:
            return 'Learner';
        case 3:
            return 'Apprentice';
        case 4:
            return 'Intermediate';
        case 5:
            return 'Average';
        case 6:
            return 'Advanced';
        case 7:
            return 'Expert';
        case 8:
            return 'Master';
        case 9:
            return 'Grandmaster';
        case 10:
            return 'Legend';
        default:
            return 'Unknown : error';
    }
};
