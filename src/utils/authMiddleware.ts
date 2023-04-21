import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { isSetToken, isSetUser } from './common';
export const requireAuth = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    if (isSetUser() && isSetToken()) {
        next();
    } else {
        next({ name: 'LogIn' });
    }
};
