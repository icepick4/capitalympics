import { User } from '../models/User';

export const getUserData = (): User | null => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
        return JSON.parse(user);
    }
    return null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};
