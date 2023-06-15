export interface User {
    id: number;
    name: string;
    image: string;
    level: Level;
    last_activity: Date;
    created_at: Date;
}

export interface UserScore {
    user_id: number;
    country_code: string;
    succeeded_streak: number;
    failed_streak: number;
    succeeded: number;
    failed: number;
    level: Level;
    token: string;
}

export type Level = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
