import axios from 'axios';
import { createStore } from 'vuex';
import ApiService from '../services/apiService';

const store = createStore({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        async logIn(context, { username, password, last_activity }) {
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
            if (response.status === 200) {
                context.commit('setToken', response.data.token);
                context.commit('setUser', response.data.user);
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
