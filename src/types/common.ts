export type LearningType = 'capital' | 'flag';
export type CurrentState = 'starting' | 'choosing';
export type ScoreType = 'succeeded' | 'failed' | 'medium';
export type Sort = 'ASC' | 'DESC';

export type Lang = 'en' | 'fr' | 'es' | 'it';
export const DefaultLang: Lang = 'en';

export interface CountryDetails {
    name: string;
    code: string;
    flag: string;
    score: number;
    region?: string;
}
export type Region =
    | 'Africa'
    | 'Americas'
    | 'Asia'
    | 'Europe'
    | 'Oceania'
    | 'World';

export type Color = 'primary' | 'error' | 'black' | 'white';

export type Translation = Record<Lang, string>;

export type Nullish = null | undefined;
export type Maybe<T> = T | Nullish;

export interface UserScore {
    user_id: number;
    country_id: number;
    learning_type: LearningType;
    score: number;
}
