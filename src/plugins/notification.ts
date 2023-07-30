// notification.ts

import Notification from '@/components/Notification/Notification.vue';
import { createApp, createVNode, h } from 'vue';

interface NotificationProperties {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
    country?: { name: string; flag: string };
    score?: number;
}

const notify = ({
    title,
    message,
    type,
    country,
    score
}: NotificationProperties) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const notificationComponent = createVNode(Notification, {
        title,
        message,
        type,
        country,
        score
    });
    const app = createApp({ render: () => h(notificationComponent) });

    app.mount(container);
};

// Ajoutez la fonction notify à l'objet global de Vue
declare global {
    interface Window {
        $notify: ({
            title,
            message,
            type,
            country,
            score
        }: NotificationProperties) => void;
    }
}

window.$notify = notify;

export { notify };
