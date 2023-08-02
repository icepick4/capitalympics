import { useStore } from '@/store';
import About from '@/views/About.vue';
import Countries from '@/views/Countries.vue';
import Home from '@/views/Home.vue';
import Learn from '@/views/Learn.vue';
import LearnTemplate from '@/views/LearnTemplate.vue';
import LegalNotices from '@/views/LegalNotices.vue';
import LogIn from '@/views/LogIn.vue';
import NotFound from '@/views/NotFound.vue';
import Profile from '@/views/Profile.vue';
import Quiz from '@/views/Quiz.vue';
import SignUp from '@/views/SignUp.vue';
import SingleCountry from '@/views/SingleCountry.vue';
import {
    NavigationGuardNext,
    RouteLocationNormalized,
    createRouter,
    createWebHistory
} from 'vue-router';
import { requireAuth } from './middlewares/auth-middleware';

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
        path: '/learn',
        name: 'Learn',
        component: Learn,
        beforeEnter: requireAuth
    },
    {
        path: '/learn/capital',
        name: 'Capitals',
        component: LearnTemplate,
        beforeEnter: requireAuth
    },
    {
        path: '/learn/flag',
        name: 'Flags',
        component: LearnTemplate,
        beforeEnter: requireAuth
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        beforeEnter: (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const store = useStore();

            if (store.isAuthenticated) {
                next({ name: 'Profile' });
            } else {
                next();
            }
        }
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn,
        beforeEnter: (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const store = useStore();

            if (store.isAuthenticated) {
                next({ name: 'Profile' });
            } else {
                next();
            }
        },
        meta: {
            isFromSignUp: false
        }
    },
    {
        path: '/countries',
        name: 'Countries',
        component: Countries
    },
    {
        path: '/countries/:countryCode',
        name: 'SingleCountry',
        component: SingleCountry,
        props: true
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        children: [
            {
                path: 'edit',
                component: Profile
            },
            {
                path: 'scores',
                component: Profile
            }
        ],
        props: true,
        beforeEnter: requireAuth
    },
    {
        path: '/quiz',
        name: 'Quiz',
        component: Quiz
    },
    {
        path: '/legal-notices',
        name: 'LegalNotices',
        component: LegalNotices
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

router.beforeEach(async (to, from, next) => {
    const store = useStore();
    if (store.isAuthenticated && !store.isCurrentUserLoaded) {
        await store.loadCurrentUser();
    }

    return next();
});

export default router;
