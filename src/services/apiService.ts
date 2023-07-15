import { CountryI } from '@/models/Country';
import { User } from '@/models/User';
import { Lang } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { getCurrentMySQLDate, getLanguage } from '@/utils/common';

export default class ApiService {
    public static async getCountries(
        max?: number,
        lang?: Lang
    ): Promise<CountryI[]> {
        lang ||= getLanguage();
        const response = await ApiClient.get<{ countries: CountryI[] }>(
            '/countries',
            { lang, max }
        );
        if (!response.success) {
            throw new Error('An error occurred while retrieving countries');
        }

        return response.data.countries;
    }

    public static async getCountry(
        code: string,
        lang: Lang = 'en'
    ): Promise<CountryI> {
        const response = await ApiClient.get<{ country: CountryI }>(
            `/countries/${code}`,
            { lang }
        );
        if (!response.success) {
            throw new Error(
                `An error occurred while retrieving the country with the code '${code}'`
            );
        }

        return response.data.country;
    }

    public static async signUp(
        username: string,
        password: string,
        language: string
    ): Promise<boolean> {
        const created_at = getCurrentMySQLDate();
        const response = await ApiClient.post('/users', {
            user: { name: username, language, password, created_at }
        });

        if (!response.success) {
            throw new Error('Could not sign up');
        }

        return true;
    }

    public static async getUsersCount(): Promise<number> {
        const response = await ApiClient.get<{ count: number }>('/users');
        if (!response.success) {
            throw new Error('Failed get user counter');
        }

        return response.data.count;
    }

    public static async getUserScore(user: User): Promise<number> {
        const response = await ApiClient.get<{
            flag_score: number;
            capital_score: number;
        }>(`/users/${user.id}/score`);
        if (!response.success) {
            throw new Error('Failed get global score');
        }

        const avg =
            (response.data.flag_score + response.data.capital_score) / 2;

        return Math.round(avg);
    }

    public static async updateUser(user: User): Promise<boolean> {
        const response = await ApiClient.put(`/users/${user.id}`, { user });

        return response.success;
    }

    public static async resetScores(user_id: number): Promise<boolean> {
        const response = await ApiClient.post(`/users/init/${user_id}`, null);
        if (!response.success) {
            throw new Error('Failed reset scores');
        }

        return true;
    }
}
