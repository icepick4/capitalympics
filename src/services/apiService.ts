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

    public static async getUserScore(): Promise<{
        capital: number;
        flag: number;
    }> {
        interface ResponseOverallScores {
            success: true;
            scores: {
                capital: number;
                flag: number;
            };
        }

        const response = await ApiClient.get<ResponseOverallScores>(
            '/scores/overall'
        );
        if (!response.success) {
            throw new Error('Failed get global scores');
        }

        const scores = response.data.scores;
        return {
            capital: scores.capital,
            flag: scores.flag
        };
    }

    public static async updateUser(user: User): Promise<boolean> {
        const response = await ApiClient.put(`/users/${user.id}`, { user });

        return response.success;
    }

    public static async resetScores(): Promise<boolean> {
        const response = await ApiClient.post(`/scores/reset`, null);
        if (!response.success) {
            throw new Error('Failed reset scores');
        }

        return true;
    }

    public static async uploadImage(
        image: Blob,
        user_id: number
    ): Promise<boolean> {
        const formData = new FormData();
        formData.append('image', image, user_id + '.png');
        console.log(image, user_id);
        const response = await ApiClient.post('/images', formData);
        if (!response.success) {
            throw new Error('Failed upload image');
        }

        return true;
    }
}
