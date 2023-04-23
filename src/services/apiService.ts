import axios, { AxiosResponse } from 'axios';
import { CountryI } from '../models/Country';
import { LearningState, LearningType } from '../types/common';
export default class ApiService {
    public static readonly API_URL: string = 'http://localhost:3001';

    public static async getCountries(): Promise<CountryI[]> {
        try {
            const response = await axios.get(`${ApiService.API_URL}/countries`);
            return response.data.countries;
        } catch (error) {
            throw new Error('Failed get countries');
        }
    }

    public static async getCountry(code: string): Promise<CountryI> {
        try {
            const response = await axios.get(
                `${ApiService.API_URL}/countries/${code}`
            );
            return response.data.country;
        } catch (error) {
            throw new Error('Failed get single Country');
        }
    }

    public static async signUp(
        username: string,
        password: string,
        created_at: string
    ): Promise<boolean> {
        try {
            const response = await axios.post(`${ApiService.API_URL}/users`, {
                user: {
                    name: username,
                    password,
                    created_at
                }
            });
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            throw new Error('Could not sign up');
        }
    }

    public static async logIn(
        username: string,
        password: string,
        last_activity: string
    ): Promise<AxiosResponse> {
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/connect`,
                {
                    user: {
                        name: username,
                        password: password,
                        last_activity: last_activity
                    }
                }
            );
            return response;
        } catch (error) {
            throw new Error('Failed log in');
        }
    }

    public static async reconnect(
        user_id: number,
        token: string
    ): Promise<AxiosResponse> {
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/connect/${user_id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        } catch (error) {
            throw new Error('Failed log in');
        }
    }

    public static async getUsersCount(): Promise<number> {
        try {
            const response = await axios.get(`${ApiService.API_URL}/users`);
            return response.data.count;
        } catch (error) {
            throw new Error('Failed get user counter');
        }
    }

    public static async getNewCountryToLearn(
        user_id: number,
        token: string,
        learningType: LearningType
    ): Promise<CountryI> {
        try {
            const response = await axios.get(
                `${ApiService.API_URL}/users/${user_id}/country/play`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.country;
        } catch (error) {
            throw new Error('Failed get new country');
        }
    }

    public static async updateUserLearning(
        user_id: number,
        country_code: string,
        token: string,
        type: LearningState
    ): Promise<AxiosResponse> {
        try {
            const response = await axios.put(
                `${ApiService.API_URL}/users/${user_id}/score/${country_code}/new_${type}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        } catch (error) {
            throw new Error('Failed update user learning');
        }
    }
}
