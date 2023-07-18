import { useStore } from '@/store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export async function requireAuth(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const store = useStore();

    if (store.isAuthenticated) {
        if (!store.isCurrentUserLoaded) {
            await store.loadCurrentUser();
        }

        return next();
    }

    next({ name: 'LogIn' });
}
