import { Lang } from '@/types/common';

export interface User {
    id: number;
    name: string;
    image: string;
    password: string;
    created_at: string;
    updated_at: string;
    language: Lang;
    avatar: Avatar;
}

export type Avatar = {
    mouth: number;
    eyes: number;
    hair: number;
    nose: number;
    skin: string;
    clothes: string;
};

export interface UserScore {
    user_id: number;
    user_name: string;
    country_code: string;
    succeeded: number;
    succeeded_streak: number;
    medium: number;
    medium_streak: number;
    failed: number;
    failed_streak: number;
    score: number;
}

export type Level = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
