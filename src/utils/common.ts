import { Level, User } from '../models/User';
import store from '../store';
import { Lang } from '../types/common';

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

export const getLanguage = (): Lang => {
    const user: User = store.getters.user;
    if (user) {
        return user.language as Lang;
    }
    const browserLanguage = navigator.language;
    return browserLanguage.substring(0, 2) as Lang;
};

export const languages = [
    { value: 'en', text: 'English' },
    { value: 'fr', text: 'Français' },
    { value: 'es', text: 'Español' }
];

export const regions = {
    fr: [
        ['Monde', 'World'],
        ['Afrique', 'Africa'],
        ['Amériques', 'Americas'],
        ['Asie', 'Asia'],
        ['Europe', 'Europe'],
        ['Océanie', 'Oceania']
    ],
    en: [
        ['World', 'World'],
        ['Africa', 'Africa'],
        ['Americas', 'Americas'],
        ['Asia', 'Asia'],
        ['Europe', 'Europe'],
        ['Oceania', 'Oceania']
    ],
    es: [
        ['Mundo', 'World'],
        ['África', 'Africa'],
        ['Américas', 'Americas'],
        ['Asia', 'Asia'],
        ['Europa', 'Europe'],
        ['Oceanía', 'Oceania']
    ]
};

export const getLevelName = (level: Level): string => {
    const user: User = store.getters.user;
    const language = user ? user.language : 'en';
    switch (language) {
        case 'fr':
            return getLevelNameFr(level);
        case 'en':
            return getLevelNameEn(level);
        case 'es':
            return getLevelNameEs(level);
        default:
            return getLevelNameEn(level);
    }
};

const getLevelNameFr = (level: Level): string => {
    switch (level) {
        case -1: // -1 is for the user who has never played
            return 'Pas de score';
        case 0:
            return 'Nouveau';
        case 1:
            return 'Débutant';
        case 2:
            return 'Apprenti';
        case 3:
            return 'Intermédiaire';
        case 4:
            return 'Moyen';
        case 5:
            return 'Normal';
        case 6:
            return 'Avancé';
        case 7:
            return 'Expert';
        case 8:
            return 'Maître';
        case 9:
            return 'Grand maître';
        case 10:
            return 'Légende';
        default:
            return 'Inconnu : erreur';
    }
};

const getLevelNameEn = (level: Level): string => {
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

const getLevelNameEs = (level: Level): string => {
    switch (level) {
        case -1: // -1 is for the user who has never played
            return 'Sin puntuación';
        case 0:
            return 'Recién llegado';
        case 1:
            return 'Principiante';
        case 2:
            return 'Aprendiz';
        case 3:
            return 'Aprendiz';
        case 4:
            return 'Intermedio';
        case 5:
            return 'Promedio';
        case 6:
            return 'Avanzado';
        case 7:
            return 'Experto';
        case 8:
            return 'Maestro';
        case 9:
            return 'Gran maestro';
        case 10:
            return 'Leyenda';
        default:
            return 'Desconocido : error';
    }
};
