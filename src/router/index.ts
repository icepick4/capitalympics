import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Countries from '../views/Countries.vue';
import Country from '../views/Country.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/countries',
        name: 'Countries',
        component: Countries
    },
    {
        path: '/country/:country',
        name: 'Country',
        component: Country
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
