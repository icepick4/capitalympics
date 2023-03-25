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
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        async logIn(context, { username, password }) {
            try {
                const response = await axios.post(
                    `${ApiService.API_URL}/users/connect`,
                    {
                        user: {
                            name: username,
                            password: password
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit('setToken', response.data.token);
                    context.commit('setUser', response.data.user);
                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async logout(context) {
            context.commit('setUser', null);
            context.commit('setToken', null);
            //reload
            window.location.reload();
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
