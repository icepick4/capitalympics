import axios, { AxiosResponse } from 'axios';
import { CountryI } from '../models/Country';
import { Level, User, UserScore } from '../models/User';
import { Lang, LearningType, ScoreType } from '../types/common';
export default class ApiService {
    public static readonly API_URL: string = 'http://localhost:3001/api';

    public static async getCountries(
        max: number = 0,
        lang: Lang
    ): Promise<CountryI[]> {
        const url = `${ApiService.API_URL}/countries?lang=${lang}${
            max === 0 ? '' : `&max=${max}`
        }`;
        try {
            const response = await axios.get(url, { timeout: 5000 });
            return response.data.countries;
        } catch (error) {
            throw new Error('Failed get countries');
        }
    }

    public static async getCountry(
        code: string,
        lang: Lang = 'en'
    ): Promise<CountryI> {
        try {
            const response = await axios.get(
                `${ApiService.API_URL}/countries/${code}?lang=${lang}`
            );
            return response.data.country;
        } catch (error) {
            throw new Error('Failed get single Country');
        }
    }

    public static async signUp(
        username: string,
        password: string,
        lang: string,
        created_at: string
    ): Promise<boolean> {
        try {
            const response = await axios.post(`${ApiService.API_URL}/users`, {
                user: {
                    name: username,
                    language: lang,
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
        const timeout: number = 5000;
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/connect`,
                {
                    user: {
                        name: username,
                        password: password,
                        last_activity: last_activity
                    }
                },
                {
                    timeout: timeout
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
        const timeout: number = 5000;
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/connect/${user_id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: timeout
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

    public static async getUserScore(
        user_id: number,
        token: string
    ): Promise<Level> {
        try {
            const response = await axios.get(
                `${ApiService.API_URL}/users/${user_id}/score`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            let flag_score = response.data.flag_score as Level;
            let capital_score = response.data.capital_score as Level;
            const avg = (flag_score + capital_score) / 2;
            return Math.round(avg) as Level;
        } catch (error) {
            throw new Error('Failed get global score');
        }
    }

    public static async updateUserLearning(
        user_id: number,
        country_code: string,
        token: string,
        score_type: ScoreType,
        learning_type: LearningType
    ): Promise<AxiosResponse> {
        try {
            const response = await axios.put(
                `${ApiService.API_URL}/users/${user_id}/${country_code}/${learning_type}/score/${score_type}`,
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

    public static async updateUser(
        user_id: number,
        token: string,
        user: User
    ): Promise<boolean> {
        try {
            const response = await axios.put(
                `${ApiService.API_URL}/users/${user_id}`,
                {
                    user: user
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    public static async getNewCountryToLearn(
        user_id: number,
        token: string,
        learning_type: LearningType,
        lang: Lang
    ): Promise<CountryI> {
        try {
            const response = await axios.get(
                `${ApiService.API_URL}/users/${user_id}/country/play/${learning_type}?lang=${lang}`,
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

    public static async getScores(
        user_id: number,
        token: string,
        length: number = 0,
        sort: string,
        learning_type: LearningType
    ): Promise<UserScore[]> {
        const url = `${
            ApiService.API_URL
        }/users/${user_id}/${learning_type}/scores${
            length === 0 ? '' : `/?max=${length}&sort=${sort}`
        }`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.scores;
        } catch (error) {
            throw new Error('Failed get scores');
        }
    }

    public static async resetScores(
        user_id: number,
        token: string
    ): Promise<boolean> {
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/init/${user_id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status != 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            throw new Error('Failed reset scores');
        }
    }
}
