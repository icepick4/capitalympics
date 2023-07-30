import { Maybe } from '@/types/common';
import { DateTime } from 'luxon';
import SuperJSON from 'superjson';

export type StorableValue = string | number | boolean | object | null;

type StoredValue<T extends StorableValue> = {
    value: T;
    expiredAt?: Maybe<string>;
};

export class LocalStorage {
    public get<T extends StorableValue>(key: string): T | undefined {
        const v: string | null = localStorage.getItem(key);
        if (!v) {
            return undefined;
        }

        const parsedValue = SuperJSON.parse<StoredValue<T>>(v);
        if (this.isExpire(parsedValue)) {
            this.remove(key);
            return;
        }

        return parsedValue.value;
    }

    public set(key: string, value: StorableValue, expires?: number): void {
        let storedValue: StoredValue<typeof value> = { value };

        if (expires) {
            const expiredAt = DateTime.now().plus({ hours: expires }).toISO();
            storedValue.expiredAt = expiredAt;
        }

        localStorage.setItem(key, SuperJSON.stringify(storedValue));
    }

    public has(key: string): boolean {
        return typeof localStorage.getItem(key) === 'string';
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public expiresIn(key: string): number | undefined {
        const v: string | null = localStorage.getItem(key);
        if (!v) {
            return undefined;
        }

        const parsedValue = SuperJSON.parse<StoredValue<any>>(v);
        if (!parsedValue.expiredAt) {
            return undefined;
        }

        const { minutes: diffInMinutes } = DateTime.fromISO(parsedValue.expiredAt).diffNow('minutes');

        return Math.round(diffInMinutes);
    }

    private isExpire(storedValue: StoredValue<any>): boolean {
        // No expiration date has been set.
        if (!storedValue.expiredAt) {
            return false;
        }

        return DateTime.now() > DateTime.fromISO(storedValue.expiredAt);
    }
}

export default new LocalStorage();
