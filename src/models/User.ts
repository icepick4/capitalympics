export class User {
    id: number;
    name: string;
    image: string;
    level: Level;
    last_activity: Date;
    created_at: Date;
    constructor(
        id: number,
        name: string,
        image: string,
        level: Level,
        last_activity: Date,
        created_at: Date
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.level = level;
        this.last_activity = last_activity;
        this.created_at = created_at;
    }
}

export class UserScore {
    user_id: number;
    country_id: number;
    succeeded_streak: number;
    failed_streak: number;
    succeeded: number;
    failed: number;
    level: Level;
    constructor(
        user_id: number,
        country_id: number,
        succeeded_streak: number,
        failed_streak: number,
        succeeded: number,
        failed: number,
        level: Level
    ) {
        this.user_id = user_id;
        this.country_id = country_id;
        this.succeeded_streak = succeeded_streak;
        this.failed_streak = failed_streak;
        this.succeeded = succeeded;
        this.failed = failed;
        this.level = level;
    }
}

export enum Level {
    Beginner = 0,
    Master = 1
}
