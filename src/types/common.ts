import { Level } from '@/models/User';

export type LearningType = 'capital' | 'flag';
export type CurrentState = 'starting' | 'choosing';
export type ScoreType = 'succeeded' | 'failed' | 'medium';
export type Sort = 'ASC' | 'DESC';
export type Lang = 'en' | 'fr' | 'es' | 'it';
export interface CountryDetails {
    name: string;
    alpha3Code: string;
    flag: string;
    level: Level;
}
export type Region =
    | 'Africa'
    | 'Americas'
    | 'Asia'
    | 'Europe'
    | 'Oceania'
    | 'World';

export type Color = 'primary' | 'error' | 'black' | 'white';
