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
    country_id: number;
    succeeded_streak: number;
    failed_streak: number;
    succeeded: number;
    failed: number;
    level: Level;
    token: string;
}

export enum Level {
    Beginner = 0,
    Intermediate = 1,
    Advanced = 2,
    Expert = 3,
    Master = 4,
    GrandMaster = 5,
    God = 6,
    Supreme = 7
}
