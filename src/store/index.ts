import ApiService from '@/services/apiService';
import { setLocalStorageToken, setLocalStorageUser } from '@/utils/common';
import { AxiosResponse } from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
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
            try {
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
            } catch (err) {
                context.commit('clearUser');
                context.commit('clearToken');
            }
        },
        async logOut(context) {
            context.commit('clearUser');
            context.commit('clearToken');
        },
        async reconnect(context, { user_id, token }) {
            try {
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
            } catch (err) {
                context.commit('clearUser');
                context.commit('clearToken');
            }
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        }
    }
});

export default store;
