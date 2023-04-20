import { AxiosResponse } from 'axios';
import { createStore } from 'vuex';
import ApiService from '../services/apiService';
import { setLocalStorageToken, setLocalStorageUser } from '../utils/common';
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
            const response: AxiosResponse = await ApiService.logIn(
                username,
                password,
                last_activity
            );
            if (response.status === 200) {
                context.commit('setToken', response.data.token);
                context.commit('setUser', response.data.user);
                setLocalStorageToken(response.data.token);
                setLocalStorageUser(response.data.user.user_id);
            } else {
                throw new Error('Login failed');
            }
        },
        async logOut(context) {
            context.commit('clearUser');
            context.commit('clearToken');
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
