import { v4 as uuidv4 } from 'uuid';
import { ref, type App } from 'vue';

export type NotificationType = 'success' | 'error' | 'warning';

export type Notification = {
    id: string;
    title: string;
    message?: string;
    type: NotificationType;
    flag?: string;
    score?: number;
}

const notifications = ref<Notification[]>([]);

export function notify(notification: Omit<Notification, 'id'>) {
    notifications.value.push({ ...notification, id: uuidv4() });
}

export default {
    install: (app: App) => {
        app.provide('notifications', notifications)
        app.provide('notify', notify)
    }
}
