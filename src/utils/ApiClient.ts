import { Nullish } from '@/types/common';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';
import { pick } from 'radash';
import LocalStorage from './LocalStorage';

type QueryParamValue = string | number | undefined | Array<string | number>;
type Query = Record<string, QueryParamValue>;

type ApiError = {
    code?: string;
    message?: string;
};

export type SuccessResponse<TData> = {
    success: true;
    data: TData;
};

type ErrorResponse = {
    success: false;
    error: ApiError;
};

export type ApiResponse<TData> = SuccessResponse<TData> | ErrorResponse;

/**
 * An http client designed to handle requests to the api
 */
class ApiClient {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create();
        this.axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
        this.axios.defaults.timeout = 10_000; // 10 seconds
        this.token = LocalStorage.get<string>('token');

        this.axios.interceptors.request.use(
            (config) => {
                const hasToken = LocalStorage.has('token');
                const expiresIn = LocalStorage.expiresIn('token');

                if (
                    hasToken &&
                    typeof expiresIn === 'number' &&
                    expiresIn < 30
                ) {
                    this.refreshToken();
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    public async get<TData>(
        url: string,
        query: Query = {},
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<TData>> {
        return this.call<TData>(
            this.axios.get(this.getUrl(url, query), config)
        );
    }

    public post<TData>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<TData>> {
        return this.call<TData>(this.axios.post(url, data, config));
    }

    public patch<TData>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<TData>> {
        return this.call<TData>(this.axios.patch(url, data, config));
    }

    public put<TData>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<TData>> {
        return this.call<TData>(this.axios.put(url, data, config));
    }

    public async delete<TData>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<TData>> {
        return this.call<TData>(this.axios.delete(url, config));
    }

    public async login(loginData: {
        name: string;
        password: string;
    }): Promise<boolean> {
        interface LoginResponse {
            success: true;
            data: { token: string };
        }

        const response = await this.post<LoginResponse>('/login', loginData);
        if (!response.success) {
            return false;
        }

        this.token = response.data.data.token;

        return true;
    }

    private async refreshToken(): Promise<void> {
        const response = await this.post<{
            success: true;
            data: { token: string };
        }>('/refresh-token');
        if (!response.success) {
            return;
        }

        this.token = response.data.data.token;
    }

    public logout(): void {
        this.token = undefined;
    }

    public get token(): string | undefined {
        return LocalStorage.get<string>('token');
    }

    private set token(value: string | Nullish) {
        if (typeof value !== 'string') {
            LocalStorage.remove('token');
            delete this.axios.defaults.headers.common['Authorization'];
        } else {
            LocalStorage.set('token', value, 2);
            this.axios.defaults.headers.common.Authorization = `Bearer ${value}`;
        }
    }

    private async call<TData>(
        axiosRequest: Promise<AxiosResponse<TData>>
    ): Promise<ApiResponse<TData>> {
        try {
            const response = await axiosRequest;
            const { data } = response;

            return { success: true, data };
        } catch (e) {
            const error = pick(e as AxiosError, ['code', 'message']);

            return { success: false, error };
        }
    }

    private getUrl(url: string, query: Query): string {
        const completeUrl = new URL(this.axios.defaults.baseURL + url);
        const formatValue = (value: QueryParamValue): string => {
            if (value === undefined) {
                return '';
            }

            if (typeof value === 'string' || typeof value === 'number') {
                return `${value}`;
            }

            return value.map((v) => formatValue(v)).join(',');
        };

        Object.keys(query).forEach((paramName) => {
            const value = query[paramName];
            if (value === undefined) {
                return;
            }

            completeUrl.searchParams.set(paramName, formatValue(value));
        });

        return completeUrl.toString();
    }
}

export default new ApiClient();
