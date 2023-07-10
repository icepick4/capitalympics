import { Lang } from '@/types/common';

export interface User {
    id: number;
    name: string;
    image: string;
    password: string;
    flag_score: number;
    capital_score: number;
    last_activity: string;
    created_at: string;
    language: Lang;
}

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
