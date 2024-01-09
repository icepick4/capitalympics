import { Level } from '@/models/User';
import { useStore } from '@/store';
import { Lang, Translation } from '@/types/common';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';

export const isToday = (date: DateTime): boolean => {
    return date.toISODate() === DateTime.local().toISODate();
};

export const isNow = (date: DateTime): boolean => {
    return DateTime.now().diff(date).as('minutes') < 10;
};

export function getCurrentMySQLDate(): string {
    return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
}

export function getLanguage(): Lang {
    const user = storeToRefs(useStore()).user;
    if (user.value) {
        return user.value.language;
    }

    return navigator.language.substring(0, 2) as Lang;
}

export const baseImageURL = import.meta.env.VITE_API_ENDPOINT + '/images/';

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
    if (isNaN(score)) {
        return '';
    }

    const language = getLanguage();
    const level = fromScoreToLevel(score);

    return Ranks[level][language];
}

export const fromScoreToLevel = (score: number): Level => {
    if (score < 0) {
        return -1;
    }

    if (score >= 100) {
        return 10;
    }

    return Math.floor(score / 10) as Level;
};

const Ranks: Record<Level, Translation> = {
    [-1]: {
        en: 'Unranked',
        es: 'Sin clasificar',
        fr: 'Non classé',
        it: 'Non classificato',
        kr: '등급 없음'
    },
    [0]: {
        en: 'Newcomer',
        es: 'Recién llegado',
        fr: 'Nouveau',
        it: 'Nuovo arrivato',
        kr: '신참자'
    },
    [1]: {
        en: 'Beginner',
        es: 'Principiante',
        fr: 'Débutant',
        it: 'Principiante',
        kr: '초보'
    },
    [2]: { 
        en: 'Learner', 
        es: 'Aprendiz', 
        fr: 'Apprenti', 
        it: 'Apprendista', 
        kr: '학습자' 
    },
    [3]: {
        en: 'Apprentice',
        es: 'Aprendiz',
        fr: 'Intermédiaire',
        it: 'Apprendista',
        kr: '견습생'
    },
    [4]: {
        en: 'Intermediate',
        es: 'Intermedio',
        fr: 'Moyen',
        it: 'Intermedio',
        kr: '중급'
    },
    [5]: { 
        en: 'Average', 
        es: 'Promedio', 
        fr: 'Normal', 
        it: 'Medio', 
        kr: '평균' 
    },
    [6]: { 
        en: 'Advanced', 
        es: 'Avanzado', 
        fr: 'Avancé', 
        it: 'Avanzato', 
        kr: '고급' 
    },
    [7]: { 
        en: 'Expert', 
        es: 'Experto', 
        fr: 'Expert', 
        it: 'Esperto', 
        kr: '전문가' 
    },
    [8]: { 
        en: 'Master', 
        es: 'Maestro', 
        fr: 'Maître', 
        it: 'Maestro', 
        kr: '마스터' 
    },
    [9]: {
        en: 'Grandmaster',
        es: 'Gran maestro',
        fr: 'Grand maître',
        it: 'Gran maestro',
        kr: '그랜드마스터'
    },
    [10]: { 
        en: 'Legend', 
        es: 'Leyenda', 
        fr: 'Légende', 
        it: 'Leggenda', 
        kr: '전설' 
    }
};
