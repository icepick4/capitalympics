import axios from 'axios';
import { CountryI } from '../models/Country';

export default class ApiService {
    private static readonly API_URL = 'http://localhost:3000';

    public static async getCountries(): Promise<CountryI[]> {
        const response = await axios.get(`${ApiService.API_URL}/countries`);
        return response.data;
    }
}
