import { AxiosResponse } from 'axios';
import { createStore } from 'vuex';
import ApiService from '../services/apiService';
import { setLocalStorageToken, setLocalStorageUser } from '../utils/common';
const store = createStore({
    state: {
        user: null,
        token: null,
        language: 'en'
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        setLanguage(state, language) {
            state.language = language;
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user_id');
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        async logIn(context, { username, password, last_activity }) {
            const response: AxiosResponse = await ApiService.logIn(
                username,
                password,
                last_activity
            );
            if (response.status === 200) {
                context.commit('setToken', response.data.token);
                context.commit('setUser', response.data.user);
                setLocalStorageToken(response.data.token);
                setLocalStorageUser(response.data.user.id);
            } else {
                throw new Error('Login failed');
            }
        },
        async logOut(context) {
            context.commit('clearUser');
            context.commit('clearToken');
        },
        async reconnect(context, { user_id, token }) {
            const response: AxiosResponse = await ApiService.reconnect(
                user_id,
                token
            );
            if (response.status === 200) {
                context.commit('setUser', response.data.user);
                context.commit('setToken', token);
            } else {
                throw new Error('Reconnect failed');
            }
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        },
        language(state) {
            return state.language;
        }
    }
});

export default store;
