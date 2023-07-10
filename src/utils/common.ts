import { Level, User } from '@/models/User';
import store from '@/store';
import { Lang, Translation } from '@/types/common';

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
    { value: 'es', text: 'Español' },
    { value: 'it', text: 'Italiano' }
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
    ],
    it: [
        ['Mondo', 'World'],
        ['Africa', 'Africa'],
        ['Americhe', 'Americas'],
        ['Asia', 'Asia'],
        ['Europa', 'Europe'],
        ['Oceania', 'Oceania']
    ]
};

export function getLevelName(score: number): string {
    const user: User = store.getters.user;
    const language = user ? user.language : 'en';
    return Ranks[fromScoreToLevel(score)][language];
}

export const fromScoreToLevel = (score: number): Level => {
    if (score < 0) {
        return -1;
    }
    return Math.floor(score / 10) as Level;
};

const Ranks: Record<Level, Translation> = {
    [-1]: {
        en: 'No score',
        es: 'Sin puntuación',
        fr: 'Pas de score',
        it: 'Nessun punteggio'
    },
    [0]: {
        en: 'Newcomer',
        es: 'Recién llegado',
        fr: 'Nouveau',
        it: 'Nuovo arrivato'
    },
    [1]: {
        en: 'Beginner',
        es: 'Principiante',
        fr: 'Débutant',
        it: 'Principiante'
    },
    [2]: { en: 'Learner', es: 'Aprendiz', fr: 'Apprenti', it: 'Apprendista' },
    [3]: {
        en: 'Apprentice',
        es: 'Aprendiz',
        fr: 'Intermédiaire',
        it: 'Apprendista'
    },
    [4]: {
        en: 'Intermediate',
        es: 'Intermedio',
        fr: 'Moyen',
        it: 'Intermedio'
    },
    [5]: { en: 'Average', es: 'Promedio', fr: 'Normal', it: 'Medio' },
    [6]: { en: 'Advanced', es: 'Avanzado', fr: 'Avancé', it: 'Avanzato' },
    [7]: { en: 'Expert', es: 'Experto', fr: 'Expert', it: 'Esperto' },
    [8]: { en: 'Master', es: 'Maestro', fr: 'Maître', it: 'Maestro' },
    [9]: {
        en: 'Grandmaster',
        es: 'Gran maestro',
        fr: 'Grand maître',
        it: 'Gran maestro'
    },
    [10]: { en: 'Legend', es: 'Leyenda', fr: 'Légende', it: 'Leggenda' }
};
