import axios from 'axios';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
export default class ApiService {
    private static readonly API_URL = 'http://localhost:3001';

    public static async getCountries(): Promise<CountryI[]> {
        const response = await axios.get(`${ApiService.API_URL}/countries`);
        return response.data.countries;
    }

    public static async getCountry(code: string): Promise<CountryI> {
        const response = await axios.get(
            `${ApiService.API_URL}/countries/${code}`
        );
        return response.data.country;
    }

    public static async logIn(
        name: string,
        password: string
    ): Promise<boolean> {
        try {
            const response = await axios.post(
                `${ApiService.API_URL}/users/connect`,
                {
                    user: {
                        name,
                        password
                    }
                }
            );
            if (response.status === 200) {
                //store token in local storage
                const token = response.data.token;
                localStorage.setItem('token', token);
                const user: User = response.data.user;
                localStorage.setItem('user', JSON.stringify(user));
            } else if (response.status === 500) {
                //user not found
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    public static async signUp(
        name: string,
        password: string
    ): Promise<boolean> {
        const response = await axios.post(`${ApiService.API_URL}/users`, {
            user: {
                name,
                password
            }
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    }

    public static async getUsersCount(): Promise<number> {
        const response = await axios.get(`${ApiService.API_URL}/users`);
        return response.data.count;
    }
}
